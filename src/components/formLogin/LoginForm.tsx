"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

const LoginForm = () => {
	const handleMicrosoftLogin = async () => {
		await signIn.social({
			provider: "microsoft",
			callbackURL: "/seteam",
		});
	};

	const handleGoogleLogin = async () => {
		await signIn.social({
			provider: "google",
			callbackURL: "/seteam",
		});
	};

	return (
		<div className="flex flex-col justify-center items-center m-4 bg-gray-500 border border-gray-100 rounded-lg p-6">
			SIGN-IN
			<div className="flex flex-wrap items-center justify-center">
				<Button
					className="btn btn-accent p-2 m-3 min-w-[150px]"
					type="button"
					onClick={handleMicrosoftLogin}
				>
					Microsoft
				</Button>
				<Button
					className="btn btn-accent p-2 m-3 min-w-[150px]"
					type="button"
					onClick={handleGoogleLogin}
				>
					Google
				</Button>
			</div>
		</div>
	);
};

export default LoginForm;
