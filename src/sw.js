workbox.skipWaiting()
workbox.clientsClaim()

const showNotification = () => {
  self.registration.showNotification('Background sync success!', {
    body: '🎉`🎉`🎉`'
  })
}

const bgSyncPlugin = new workbox.backgroundSync.Plugin(
  'ClassyPOS_Sale',
  {
    callbacks: {
      queueDidReplay: showNotification
      // other types of callbacks could go here
    }
  }
)

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin]
})

workbox.routing.registerRoute(
  /http:\/\/techlab.classy.pos\/\/Api\/V1\/Accounts\/Expense\/Category\/New/,
  networkWithBackgroundSync,
  'POST'
)

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(/https:\/\/techlab.classy.pos/, workbox.strategies.staleWhileRevalidate(), 'GET')

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
  workbox.precaching.precacheAndRoute([])
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
