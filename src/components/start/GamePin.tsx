import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { toast, type Toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
	pin: z
		.string()
		.regex(/^[a-z]+$/, {
			message: "The pin must be lowercase alphabetic",
		})
		.trim()
		.min(5, {
			message: "The pin must be at least 5 characters",
		})
		.max(10, {
			message: "The pin must be at most 10 characters",
		}),
});

const failedCreationToast: Toast = {
	description: "Failed to create the game :(",
	variant: "destructive",
};

async function createGame({ pin }: z.infer<typeof formSchema>) {
	try {
		const response = await fetch("/api/create", {
			method: "POST",
			body: JSON.stringify({ pin }),
		});
		if (response.ok) {
			toast({
				description: "Game created successfully!",
				variant: "success",
			});
			setTimeout(() => {
				window.location.href = "/game";
			}, 1000);
		} else {
			toast(failedCreationToast);
		}
	} catch (error) {
		toast(failedCreationToast);
	}
}

const getJoinGameHandler =
	(game_code?: string) =>
	async ({ pin }: z.infer<typeof formSchema>) => {
		try {
			const response = await fetch("/api/join", {
				method: "POST",
				body: JSON.stringify({ game_code, game_pin: pin }),
			});
			const status = response.status;
			if (status === 400) {
				toast({
					description: "Bad request.",
					variant: "destructive",
				});
			}
			if (status === 404) {
				toast({
					description: "Game not found :(",
					variant: "destructive",
				});
			}
			if (status === 401) {
				toast({
					description: "The provided pin is incorrect.",
					variant: "destructive",
				});
			}
			if (response.ok) {
				window.location.href = "/game";
			}
		} catch (error) {
			toast({
				description: "Failed to join the game :(",
				variant: "destructive",
			});
		}
	};

export function GamePinDialog({
	game_code,
	isNewGame,
	buttonClasses,
	buttonText,
	buttonEnabled = true,
	buttonLoading = false,
}: {
	game_code?: string;
	isNewGame?: boolean;
	buttonClasses?: string;
	buttonText?: string;
	buttonEnabled?: boolean;
	buttonLoading?: boolean;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			pin: "",
		},
	});

	const title = isNewGame
		? "Create a pin for the game"
		: "Enter the pin for the game";

	return (
		<Dialog>
			<DialogTrigger asChild>
				{buttonEnabled ? (
					<Button className={buttonClasses}>{buttonText}</Button>
				) : (
					<Button className={buttonClasses} disabled>
						{buttonLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{buttonText}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(
							isNewGame ? createGame : getJoinGameHandler(game_code),
						)}
						className="space-y-8"
					>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
						</DialogHeader>
						<FormField
							control={form.control}
							name="pin"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Pin</FormLabel>
									<FormControl>
										<Input className="text-2xl" {...field} />
									</FormControl>
									{isNewGame && (
										<FormDescription>
											Any word above 5 and under 10 characters is valid
										</FormDescription>
									)}
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className="sm:justify-center">
							<Button type="submit" className="min-w-40 rounded-full">
								Submit
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
