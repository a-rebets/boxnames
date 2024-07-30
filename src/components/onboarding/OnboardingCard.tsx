import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const OnboardingCard = (props: {
	withExamples?: boolean;
	title: string;
	subtitle: string;
	children: React.ReactNode;
	examples?: React.ReactNode;
}) => {
	return (
		<Card className="dark:bg-neutral-900">
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.subtitle}</CardDescription>
			</CardHeader>
			<CardContent className="flex items-center px-6 pb-5 select-none">
				{props.children}
			</CardContent>
			{props.withExamples && (
				<CardFooter>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>Examples</AccordionTrigger>
							<AccordionContent>{props.examples}</AccordionContent>
						</AccordionItem>
					</Accordion>
				</CardFooter>
			)}
		</Card>
	);
};

export default OnboardingCard;
