import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import avatars from "@/assets/avatars.json";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
	name: z
		.string()
		.regex(/^[a-zA-Z\s]+$/, {
			message: "Name must be alphabetic",
		})
		.trim()
		.min(2, {
			message: "Name must be at least 2 characters",
		})
		.max(50),
	avatar: z
		.string()
		.min(3, {
			message: "Avatar is required",
		})
		.max(10),
});

const UserCard = () => {
	const [cookies, setCookie] = useCookies(["user"]);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			avatar: "dog",
		},
	});

	function onSubmit({ name, avatar }: z.infer<typeof formSchema>) {
		if (cookies.user) {
			toast({
				description: "You are already registered!",
				variant: "success",
			});
		} else {
			const oneYearFromNow = new Date();
			oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
			setCookie("user", `${avatar}|${name}`, {
				expires: oneYearFromNow,
			});
			toast({
				description: "Registered successfully!",
				variant: "success",
			});
		}
		// reload the page
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	}

	return (
		<Card className="dark:bg-neutral-900">
			<CardHeader>
				<CardTitle>Ok, let's register you!</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your name</FormLabel>
									<FormControl>
										<Input placeholder="John Appleseed" {...field} />
									</FormControl>
									<FormDescription>
										This will be displayed next to your avatar in the game.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="avatar"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your avatar</FormLabel>
									<FormControl>
										<Input className="hidden" {...field} />
									</FormControl>
									<ToggleGroup
										type="single"
										className="flex-wrap justify-start gap-y-4 pt-4"
										onValueChange={(value) => {
											if (value && value !== field.value) {
												field.onChange(value);
											}
										}}
										value={field.value}
									>
										{avatars.map((avatar) => (
											<ToggleGroupItem
												value={avatar.value}
												aria-label={avatar.label}
												key={`avatar-${avatar.value}`}
												className="text-2xl p-6 aspect-square data-[state=on]:ring-blue-500 dark:data-[state=on]:ring-blue-200 data-[state=on]:ring-2"
											>
												{avatar.icon}
											</ToggleGroupItem>
										))}
									</ToggleGroup>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-center">
							<Button
								type="submit"
								className="bg-box-800 hover:bg-box-900 dark:bg-box-700 dark:hover:bg-box-800 dark:text-neutral-50"
							>
								Register to play
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default UserCard;
