import { PTOProvider } from "@/contexts/PTOContext";

export default function PTOLayout({ children }: { children: React.ReactNode }) {
	return <PTOProvider>{children}</PTOProvider>;
}
