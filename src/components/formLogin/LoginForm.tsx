import { doExternalLogin } from "@/actions/signInSignOut"
import { Button } from "@/components/ui/button"

const LoginForm = () => {
  return (
    <>
    <form action={doExternalLogin}>
        <div className="flex flex-wrap justify-center items-center m-4">
        <Button className="btn btn-accent p-2 m-3 min-w-[200px]"
                type="submit" name="action" value="microsoft-entra-id">
                Sign In With Microsoft
        </Button>
        <Button 
            className="btn btn-accent p-2 m-3 min-w-[200px]"
            type="submit" name="action" value="google">
            Sign in With Google
        </Button>
        </div>
    </form>
    </>
  )
}

export default LoginForm