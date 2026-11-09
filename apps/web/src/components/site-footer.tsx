export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[var(--forest-deep)] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-2">
        <div>
          <p className="text-2xl font-semibold">LibraGems</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            Gemstone trading and product enquiries. Contact the team for current product
            information and availability.
          </p>
        </div>
        <div className="text-sm text-white/75">
          <p>Contact details will be published after business verification.</p>
          <p className="mt-3">© {new Date().getFullYear()} LibraGems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
