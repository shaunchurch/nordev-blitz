import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link, useMutation } from "blitz"
import logout from "../mutations/logout"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  if (currentUser) {
    return (
      <>
        <button
          className="button small ml-auto"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        {/* <div>
          User id: <code>{currentUser.id}</code>
        </div> */}
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

export default UserInfo
