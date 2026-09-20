import logo from '../imgs/logo.webp'

/**
 * Silver Smart lockup: the "S" monogram followed by the wordmark.
 *
 * Replaces the placeholder square that ss.css draws via `.mark::before`
 * (suppressed by the `has-logo` class in app.css), keeping the mark's
 * existing size, letter-spacing and colour treatment untouched.
 */
export default function Logo() {
  return (
    <>
      <img className="mark-logo" src={logo} alt="" width="931" height="1024" />
      <b>SILVER</b> <span className="sm">SMART</span>
    </>
  )
}
