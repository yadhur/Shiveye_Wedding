import { lazy, Suspense } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import FloatingContact from "./components/FloatingContact"
import Loader from "./components/Loader"
import ScrollToTop from "./components/ScrollToTop"

/**
 * Module-scope flag. True until the first lazy page has finished
 * loading once. Because it lives at module scope (not component
 * state), it is set exactly once per actual page load/reload —
 * a hard refresh re-evaluates this whole module and resets it to
 * false again, but navigating between routes client-side does NOT
 * reset it, since the module stays in memory.
 */
let isFirstLoad = true

/**
 * Wraps a dynamic import() so that, ONLY on the very first page load,
 * the resolved module is delayed by `minDuration` ms (giving the Loader
 * time to play its full animation). On every subsequent client-side
 * route change within the same session, the import resolves as fast
 * as it actually is (typically near-instant, since the chunk is
 * already fetched/cached) — no artificial delay.
 */
function lazyWithInitialDelay(importFn, minDuration = 5000) {
  return lazy(() => {
    const shouldDelay = isFirstLoad
    isFirstLoad = false

    if (!shouldDelay) {
      return importFn()
    }

    return Promise.all([
      importFn(),
      new Promise((resolve) => setTimeout(resolve, minDuration)),
    ]).then(([moduleExports]) => moduleExports)
  })
}

const Home = lazyWithInitialDelay(() => import("./pages/Home"), 5000)
const About = lazyWithInitialDelay(() => import("./pages/AboutUs"))
const Testimonials = lazyWithInitialDelay(() => import("./pages/Testimonial"))
const PrivacyPolicy = lazyWithInitialDelay(() => import("./pages/PrivacyPolicy"))
const TermsAndConditions = lazyWithInitialDelay(() => import("./pages/TermsAndConditions"))
const ServiceGallery = lazyWithInitialDelay(() => import("./pages/ServiceGallery"))
const ServiceFilms = lazyWithInitialDelay(() => import("./pages/ServiceFilms"))

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader duration={5000} />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<Loader duration={2500} />}>
                <About />
              </Suspense>
            }
          />
          
          <Route
            path="/testimonials"
            element={
              <Suspense fallback={<Loader duration={2500} />}>
                <Testimonials />
              </Suspense>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={<Loader duration={2500} />}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <Suspense fallback={<Loader duration={2500} />}>
                <TermsAndConditions />
              </Suspense>
            }
          />
          <Route
            path="/service-gallery/:service"
            element={
              <Suspense fallback={<Loader duration={2500} />}>
                <ServiceGallery />
              </Suspense>
            }
          />
          <Route
            path="/service-films/:service"
            element={
              <Suspense fallback={<Loader duration={2500} />}>
                <ServiceFilms/>
              </Suspense>
            }
          />
          
        </Routes>
      </BrowserRouter>
      <FloatingContact />
    </>
  )
}

export default App