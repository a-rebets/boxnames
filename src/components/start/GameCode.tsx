import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { GamePinDialog } from "./GamePin";
import { useCallback, useEffect, useState } from "react";
import { toast, type Toast } from "@/components/ui/use-toast";

const gameMissingToast: Toast = {
	title: "A game with this code does not exist.",
	description: "Please try another code",
	variant: "destructive",
};

const invalidCodeToast: Toast = {
	title: "Received an invalid game code",
	variant: "destructive",
};

const errorToast: Toast = {
	title: "An error occurred.",
	description: "Please try again later",
	variant: "destructive",
};

const GameCode = ({ className }: { className?: string }) => {
	const [value, setValue] = useState("");
	const [buttonEnabled, setButtonEnabled] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [checkedCodes, setCheckedCodes] = useState<string[]>([]);

	const checkGameCode = useCallback(async function checkGameCode(code: string) {
		try {
			const { status } = await fetch(`/api/check_game?code=${code}`);
			setTimeout(() => {
				if (status === 200) {
					setButtonEnabled(true);
				} else if (status === 404) {
					toast(gameMissingToast);
					setCheckedCodes((prev) => [...prev, code]);
				} else if (status === 400) {
					toast(invalidCodeToast);
				}
				setButtonLoading(false);
			}, 1000);
		} catch (error) {
			console.error(error);
			toast(errorToast);
		}
	}, []);

	useEffect(() => {
		if (value.length === 6 && !checkedCodes.includes(value)) {
			setButtonLoading(true);
			checkGameCode(value);
		} else if (checkedCodes.includes(value)) {
			toast(gameMissingToast);
		}
	}, [value, checkedCodes, checkGameCode]);

	return (
		<div
			className={cn("flex flex-col gap-4 w-full px-12 items-center", className)}
		>
			<Separator />
			<h2 className="text-base text-center pt-6">Enter the game code</h2>
			<InputOTP
				maxLength={6}
				pattern={REGEXP_ONLY_DIGITS}
				value={value}
				onChange={setValue}
			>
				<InputOTPGroup>
					<InputOTPSlot className="dark:border-neutral-500" index={0} />
					<InputOTPSlot className="dark:border-neutral-500" index={1} />
					<InputOTPSlot className="dark:border-neutral-500" index={2} />
					<InputOTPSlot className="dark:border-neutral-500" index={3} />
					<InputOTPSlot className="dark:border-neutral-500" index={4} />
					<InputOTPSlot className="dark:border-neutral-500" index={5} />
				</InputOTPGroup>
			</InputOTP>
			<GamePinDialog
				buttonClasses="mt-2 bg-green-600 hover:bg-green-700 dark:bg-green-400 dark:hover:bg-green-500 rounded-full text-sm h-8"
				buttonText="Join"
				buttonEnabled={buttonEnabled}
				buttonLoading={buttonLoading}
				game_code={buttonEnabled ? value : ""}
			/>
		</div>
	);
};

export default GameCode;
