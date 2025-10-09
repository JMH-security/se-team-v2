import { doExternalLogin } from "@/actions/signInSignOut";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
	return (
		<>
			<form action={doExternalLogin}>
				<div className="flex flex-col justify-center items-center m-4 bg-gray-500 border border-gray-100 rounded-lg p-6">
					SIGN-IN
					<div className="flex flex-wrap">
						<Button
							className="btn btn-accent p-2 m-3 min-w-[150px]"
							type="submit"
							name="action"
							value="microsoft-entra-id"
						>
							Microsoft
						</Button>
						<Button
							className="btn btn-accent p-2 m-3 min-w-[150px]"
							type="submit"
							name="action"
							value="google"
						>
							Google
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
