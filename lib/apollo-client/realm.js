import * as Realm from 'realm-web'

export async function getRealmAccessToken() {
  const app = new Realm.App(process.env.NEXT_PUBLIC_REALM_APP_ID)
  const credentials = Realm.Credentials.apiKey(
    process.env.NEXT_PUBLIC_REALM_APP_KEY
  )

  if (!app.currentUser) {
    await app.logIn(credentials)
  } else {
    await app.currentUser.refreshCustomData()
  }

  return app.currentUser.accessToken
}
