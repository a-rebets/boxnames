import OnboardingCard from "./OnboardingCard";

type CardEntry = {
	key: string;
	node: React.ReactNode;
};

const Example = ({ children }: { children: React.ReactNode }) => {
	return <div className="flex rounded-md border p-4 mb-1">{children}</div>;
};

const allCards: CardEntry[] = [
	{
		key: "welcome",
		node: (
			<OnboardingCard
				title="Welcome to Boxnames!"
				subtitle="An alternative version of Codenames"
			>
				<ul className="list-disc list-inside">
					<li>Boxnames is a team-based word-guessing game.</li>
					<li>
						Split into two teams:{" "}
						<span className="bg-team-red text-neutral-50">&nbsp;Red&nbsp;</span>{" "}
						and{" "}
						<span className="bg-team-blue text-neutral-50">
							&nbsp;Blue&nbsp;
						</span>
						.
					</li>
					<li>Each team has a spymaster and field operatives.</li>
					<li>
						Goal - guess all your team's words based on clues from your
						spymaster.
					</li>
				</ul>
			</OnboardingCard>
		),
	},
	{
		key: "general",
		node: (
			<OnboardingCard title="Game Setup" subtitle="A general overview">
				<ul className="list-disc list-inside">
					<li>25 codename cards are arranged in a 5x5 grid</li>
					<li>
						A key card showing agent cards 🔵🔴, innocent bystanders 🟡, and the
						assassin ⚫️ gets randomly selected.
					</li>
					<li>
						Spymasters see the final layout, field operatives just see the
						uncolored cards
					</li>
				</ul>
			</OnboardingCard>
		),
	},
	{
		key: "objective",
		node: (
			<OnboardingCard
				title="Objective"
				subtitle="What each team is trying to do"
			>
				<ul className="list-disc list-inside">
					<li>Teams alternate turns giving clues and guessing words.</li>
					<li>First team to guess all their words wins.</li>
					<li>Avoid the assassin word to prevent an immediate loss.</li>
				</ul>
			</OnboardingCard>
		),
	},
	{
		key: "clue-basics",
		node: (
			<OnboardingCard
				title="Clue Giving Basics"
				subtitle="How to give clues"
				withExamples={true}
				examples={
					<>
						<Example>Clue: "Tree"</Example>
						<Example>Number: 2</Example>
						<Example>Related Words: "Leaf", "Nut"</Example>
					</>
				}
			>
				<ul className="list-disc list-inside">
					<li>
						Spymasters give a one-word clue plus a number (indicating how many
						words relate to the clue).
					</li>
					<li>Clues should relate to the meaning of the words.</li>
				</ul>
			</OnboardingCard>
		),
	},
	{
		key: "valid-clues",
		node: (
			<OnboardingCard
				title="Valid Clues"
				subtitle="Rules for giving clues"
				withExamples={true}
				examples={
					<>
						<Example>Proper Name: "Washington" for "George Washington"</Example>
						<Example>Homonym: "Knight" (sounds like "Night")</Example>
						<Example>
							Rhyme: "Snail" for "Mail" (common phrase: "Snail Mail")
						</Example>
					</>
				}
			>
				<ul className="list-disc list-inside">
					<li>Clues must be about the word's meaning.</li>
					<li>No part of a visible word on the table can be used.</li>
					<li>Proper names and common phrases are allowed.</li>
					<li>Use homonyms and rhymes if they relate to the meaning.</li>
				</ul>
			</OnboardingCard>
		),
	},
	{
		key: "guessing",
		node: (
			<OnboardingCard
				title="Guessing Words"
				subtitle="How to guess words"
				withExamples={true}
				examples={
					<>
						<Example>
							✅ Correct guess: the selected card gets the team's color.
						</Example>
						<Example>
							❌ Incorrect guess: the selected card gets the opposing team's
							color or an innocent bystander's color.
						</Example>
					</>
				}
			>
				<ul className="list-disc list-inside">
					<li>Field operatives discuss and decide based on the clue.</li>
					<li>Touching a card indicates their guess.</li>
					<li>
						Correct guesses allow for continued guessing up to the clue number.
					</li>
				</ul>
			</OnboardingCard>
		),
	},
	{
		key: "ending",
		node: (
			<OnboardingCard
				title="The end of the game"
				subtitle="Conditions for winning or losing"
			>
				<ul className="list-disc list-inside">
					<li>The game ends when a team guesses all their words.</li>
					<li>
						🚫 Guessing the assassin ends the game with an immediate loss for
						that team.
					</li>
					<li>
						For the next game the key card is reshuffled and the codename cards
						are flipped.
					</li>
				</ul>
			</OnboardingCard>
		),
	},
];

export default allCards;
