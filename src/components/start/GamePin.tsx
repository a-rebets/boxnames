import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";

const GamePin = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn("flex flex-col gap-4 w-full px-12 items-center", className)}
		>
			<Separator />
			<h2 className="text-base text-center pt-6">Enter the game pin</h2>
			<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
				<InputOTPGroup>
					<InputOTPSlot className="dark:border-neutral-500" index={0} />
					<InputOTPSlot className="dark:border-neutral-500" index={1} />
					<InputOTPSlot className="dark:border-neutral-500" index={2} />
					<InputOTPSlot className="dark:border-neutral-500" index={3} />
					<InputOTPSlot className="dark:border-neutral-500" index={4} />
					<InputOTPSlot className="dark:border-neutral-500" index={5} />
				</InputOTPGroup>
			</InputOTP>
			<Button className="mt-2 bg-green-600 hover:bg-green-700 dark:bg-green-400 dark:hover:bg-green-500 rounded-full text-sm h-8">
				Join
			</Button>
		</div>
	);
};

export default GamePin;
