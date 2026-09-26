import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import {
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js/max'
import type { CountryCode } from 'libphonenumber-js/max'
import examples from 'libphonenumber-js/mobile/examples'

/** Everything the form needs to know about the phone field, kept as separate parts. */
export interface PhoneValue {
  country: CountryCode
  /** e.g. `+971` */
  callingCode: string
  /** Digits only, without the national trunk prefix — e.g. `501234567`. */
  nationalNumber: string
  /** E.164 — e.g. `+971501234567`. Empty when nothing usable has been entered. */
  internationalNumber: string
  isEmpty: boolean
  isValid: boolean
}

interface CountryOption {
  code: CountryCode
  name: string
  dial: string
  flag: string
  /** Lower-cased, accent-stripped name used for search. */
  key: string
}

const fold = (s: string): string => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** Regional-indicator pair for an ISO code, e.g. `AE` → 🇦🇪. Rendered via the Twemoji flag font. */
const toFlag = (code: string): string =>
  String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0)))

const regionNames = typeof Intl.DisplayNames === 'function' ? new Intl.DisplayNames(['en'], { type: 'region' }) : null

const COUNTRIES: CountryOption[] = getCountries()
  .map((code) => {
    const name = regionNames?.of(code) ?? code
    return { code, name, dial: `+${getCountryCallingCode(code)}`, flag: toFlag(code), key: fold(name) }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const BY_CODE = new Map(COUNTRIES.map((c) => [c.code, c]))

/** A realistic national-format example for the placeholder, e.g. AE → `50 123 4567`. */
const placeholderFor = (country: CountryCode): string => {
  const example = getExampleNumber(country, examples)
  if (!example) return ''
  return example.formatInternational().replace(`+${example.countryCallingCode}`, '').trim()
}

export function resolvePhone(country: CountryCode, input: string): PhoneValue {
  const callingCode = `+${getCountryCallingCode(country)}`
  const isEmpty = input.replace(/\D/g, '') === ''
  const parsed = isEmpty ? undefined : parsePhoneNumberFromString(input, country)
  return {
    country,
    callingCode,
    nationalNumber: parsed?.nationalNumber ?? input.replace(/\D/g, ''),
    internationalNumber: parsed?.number ?? '',
    isEmpty,
    isValid: !isEmpty && !!parsed?.isValid(),
  }
}

interface PhoneFieldProps {
  id: string
  name: string
  defaultCountry: CountryCode
  error: string | null
  onChange: (value: PhoneValue) => void
  /** Fires when focus leaves the whole field (input and country selector). */
  onBlur: () => void
}

/**
 * Phone input with a searchable country selector. The visible input holds the
 * national number only; a hidden input carries the E.164 value under `name`,
 * so the form's FormData submission reads a proper international number.
 */
export default function PhoneField({ id, name, defaultCountry, error, onChange, onBlur }: PhoneFieldProps) {
  const uid = useId()
  const listId = `${uid}-list`
  const ccId = `${uid}-cc`
  const errorId = `${uid}-err`

  const [country, setCountry] = useState<CountryCode>(defaultCountry)
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = BY_CODE.get(country) ?? COUNTRIES[0]
  const value = useMemo(() => resolvePhone(country, input), [country, input])
  const placeholder = useMemo(() => placeholderFor(country), [country])

  const filtered = useMemo(() => {
    const q = fold(query.trim())
    if (!q) return COUNTRIES
    const digits = q.replace(/^\+/, '')
    // Name prefix first, then word prefix, then anywhere — so "india" puts India above
    // British Indian Ocean Territory. Array sort is stable, keeping alphabetical order within a rank.
    const rank = (c: CountryOption): number => {
      if (c.code.toLowerCase() === q || c.key.startsWith(q)) return 0
      if (c.key.includes(` ${q}`)) return 1
      return 2
    }
    return COUNTRIES.filter(
      (c) =>
        c.key.includes(q) ||
        c.code.toLowerCase() === q ||
        (/^\d+$/.test(digits) && c.dial.slice(1).startsWith(digits)),
    ).sort((a, b) => rank(a) - rank(b))
  }, [query])

  // Report every change upward; the parent owns validation messaging.
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const onBlurRef = useRef(onBlur)
  onBlurRef.current = onBlur
  useEffect(() => {
    onChangeRef.current(value)
  }, [value])

  // Track whether a pointer press is in progress, so a blur caused by pressing
  // e.g. the submit button doesn't insert the error line (shifting the button
  // away from the pointer) before that press becomes a click.
  const pressing = useRef(false)
  useEffect(() => {
    const down = (): void => {
      pressing.current = true
    }
    const up = (): void => {
      pressing.current = false
    }
    document.addEventListener('pointerdown', down, true)
    document.addEventListener('pointerup', up, true)
    document.addEventListener('pointercancel', up, true)
    return () => {
      document.removeEventListener('pointerdown', down, true)
      document.removeEventListener('pointerup', up, true)
      document.removeEventListener('pointercancel', up, true)
    }
  }, [])

  // Close on outside press.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent): void => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // On open: focus search and bring the current country into view.
  useEffect(() => {
    if (!open) return
    searchRef.current?.focus()
    const list = listRef.current
    const el = list?.querySelector<HTMLElement>('[aria-selected="true"]')
    if (list && el) list.scrollTop = el.offsetTop - list.clientHeight / 2 + el.offsetHeight / 2
  }, [open])

  // Keep the keyboard-active option visible without scrolling the page.
  useEffect(() => {
    const list = listRef.current
    const el = list?.children[active] as HTMLElement | undefined
    if (!list || !el) return
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight
  }, [active])

  const openList = (): void => {
    setQuery('')
    setActive(Math.max(0, COUNTRIES.findIndex((c) => c.code === country)))
    setOpen(true)
  }

  const closeList = (refocus: boolean): void => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus()
  }

  const choose = (code: CountryCode): void => {
    setCountry(code)
    setOpen(false)
    inputRef.current?.focus()
  }

  const onTriggerKey = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      openList()
    }
  }

  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>): void => {
    const last = filtered.length - 1
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive((i) => Math.min(last, i + 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActive((i) => Math.max(0, i - 1))
        break
      case 'PageDown':
        e.preventDefault()
        setActive((i) => Math.min(last, i + 8))
        break
      case 'PageUp':
        e.preventDefault()
        setActive((i) => Math.max(0, i - 8))
        break
      case 'Enter':
        e.preventDefault()
        if (filtered[active]) choose(filtered[active].code)
        break
      case 'Escape':
        e.preventDefault()
        closeList(true)
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  const onInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value.replace(/[^\d\s()+.-]/g, '')
    // A full international number pasted in switches the selector to match.
    if (raw.trim().startsWith('+')) {
      const parsed = parsePhoneNumberFromString(raw)
      if (parsed?.country && parsed.isValid()) {
        setCountry(parsed.country)
        setInput(parsed.formatInternational().replace(`+${parsed.countryCallingCode}`, '').trim())
        return
      }
    }
    setInput(raw)
  }

  const onGroupBlur = (e: FocusEvent<HTMLDivElement>): void => {
    if (rootRef.current?.contains(e.relatedTarget as Node | null)) return
    setOpen(false)
    // Tidy a valid entry into the country's national grouping.
    if (value.isValid) {
      const parsed = parsePhoneNumberFromString(value.internationalNumber)
      if (parsed) setInput(parsed.formatInternational().replace(`+${parsed.countryCallingCode}`, '').trim())
    }
    const report = (): void => {
      window.setTimeout(() => onBlurRef.current(), 0)
    }
    if (pressing.current) window.addEventListener('pointerup', report, { once: true, capture: true })
    else report()
  }

  const activeId = filtered[active] ? `${uid}-opt-${filtered[active].code}` : undefined

  return (
    <div className="phone" ref={rootRef} onBlur={onGroupBlur} data-invalid={error ? '' : undefined}>
      <div className="phone-control">
        <button
          ref={triggerRef}
          type="button"
          className="phone-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-label={`Country code: ${selected.name} ${selected.dial}. Change country`}
          onClick={() => (open ? closeList(false) : openList())}
          onKeyDown={onTriggerKey}
        >
          <span className="phone-flag" aria-hidden="true">{selected.flag}</span>
          <ChevronDown className="phone-chevron" size={14} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <span className="phone-dial" aria-hidden="true">{selected.dial}</span>
        <input
          ref={inputRef}
          id={id}
          className="phone-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={placeholder}
          value={input}
          onChange={onInput}
          maxLength={24}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${ccId} ${errorId}` : ccId}
        />
      </div>
      <span id={ccId} className="phone-sr">
        Country code {selected.dial}, {selected.name}
      </span>
      <input type="hidden" name={name} value={value.internationalNumber} />

      {error && (
        <p id={errorId} className="phone-error">
          {error}
        </p>
      )}

      {open && (
        <div className="phone-pop">
          <div className="phone-search">
            <Search size={14} strokeWidth={1.75} aria-hidden="true" />
            <input
              ref={searchRef}
              className="phone-search-input"
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={activeId}
              aria-label="Search countries"
              placeholder="Search country or code"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActive(0)
              }}
              onKeyDown={onSearchKey}
            />
          </div>
          <ul ref={listRef} id={listId} role="listbox" aria-label="Countries" className="phone-list">
            {filtered.map((c, i) => (
              <li
                key={c.code}
                id={`${uid}-opt-${c.code}`}
                role="option"
                aria-selected={c.code === country}
                className={i === active ? 'phone-opt is-active' : 'phone-opt'}
                onMouseDown={(e) => e.preventDefault()}
                onMouseMove={() => i !== active && setActive(i)}
                onClick={() => choose(c.code)}
              >
                <span className="phone-flag" aria-hidden="true">{c.flag}</span>
                <span className="phone-opt-name">{c.name}</span>
                <span className="phone-opt-dial">{c.dial}</span>
                <span className="phone-opt-check" aria-hidden="true">
                  {c.code === country && <Check size={14} strokeWidth={2} />}
                </span>
              </li>
            ))}
          </ul>
          {filtered.length === 0 && (
            <p className="phone-empty" role="status">
              No countries match “{query}”
            </p>
          )}
        </div>
      )}
    </div>
  )
}
