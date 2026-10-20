function Footer() {
  return (
    <footer id="contact" className="border-t border-divider py-14 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-10">
          <div>
            <h2 className="text-2xl font-extrabold mb-3">
              Contact <span className="text-text-primary">Fit</span><span className="text-accent">Zone</span>
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Questions about our classes or memberships?<br />
              Our team is here to help.
            </p>
          </div>
          <address className="not-italic">
            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
              <dt className="font-bold text-text-primary">Email</dt>
              <dd><a href="mailto:info@fitzone.com" className="text-text-muted hover:text-accent transition-colors">info@fitzone.com</a></dd>
              <dt className="font-bold text-text-primary">Phone</dt>
              <dd><a href="tel:+27000000000" className="text-text-muted hover:text-accent transition-colors">+27 00 000 0000</a></dd>
              <dt className="font-bold text-text-primary">Address</dt>
              <dd className="text-text-muted">123 Fitness Street, Ballito</dd>
            </dl>
          </address>
        </div>
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-text-muted text-xs">© 2026 FitZone Fitness Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
