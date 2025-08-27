import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { Outlet, Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppRoot, Button, Section, Cell, List } from '@telegram-apps/telegram-ui'
import Onboarding from './pages/Onboarding'
import '@telegram-apps/telegram-ui/dist/styles.css'

function Layout() {
  return (
    <AppRoot>
      <div className="min-h-screen bg-background text-foreground">
        <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
          <div className="px-4 py-3 text-lg font-semibold">Dream Wallet</div>
        </div>
        <main className="p-4 pb-20">
          <Outlet />
        </main>
        <nav className="fixed bottom-0 left-0 right-0 border-t p-3 bg-background/80 backdrop-blur">
          <div className="flex gap-3 justify-around">
            <Link to="/" className="underline">Home</Link>
            <Link to="/profile" className="underline">Profile</Link>
          </div>
        </nav>
      </div>
    </AppRoot>
  )
}

function Home() {
  useEffect(() => {
    WebApp.ready()
    WebApp.expand()
  }, [])
  const initData = WebApp.initDataUnsafe
  const user = initData?.user
  return (
    <Section header="Home">
      <List>
        <Cell subtitle={user ? `@${user.username ?? user.id}` : 'Guest'}>Welcome</Cell>
      </List>
      <div className="mt-4">
        <Button size="l" onClick={() => WebApp.showAlert('Hello from Dream Wallet!')}>Say Hello</Button>
      </div>
    </Section>
  )
}

function Profile() {
  const user = WebApp?.initDataUnsafe?.user
  return (
    <Section header="Profile">
      {user ? (
        <List>
          <Cell>First name: {user.first_name}</Cell>
          {user.last_name && <Cell>Last name: {user.last_name}</Cell>}
          {user.username && <Cell>Username: @{user.username}</Cell>}
          <Cell>User ID: {user.id}</Cell>
        </List>
      ) : (
        <div>No user info. Open inside Telegram.</div>
      )}
    </Section>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Onboarding /> },
  {
    path: '/app',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
