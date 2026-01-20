import { PTOProvider } from "@/contexts/PTOContext";

export default function AdminPTOLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <PTOProvider>{children}</PTOProvider>;
}
