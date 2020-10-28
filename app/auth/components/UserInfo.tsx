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
      <div className="flex flex-row space-x-4 justify-center items-center mt-4">
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
      </div>
    )
  }
}

export default UserInfo
