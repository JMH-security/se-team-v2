import SupervisorForm from "@/components/wt/supervisor/SupervisorForm";
import SupervisorList from "@/components/wt/supervisor/SupervisorList";
import Sidebar from "@/components/wt/Sidebar";

import { Card, CardContent } from "@/components/ui/card";

export default function SupervisorsContent() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 p-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<Card>
						<CardContent>
							<SupervisorForm />
						</CardContent>
					</Card>
					<Card className="md:col-span-2">
						<CardContent>
							<SupervisorList />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
