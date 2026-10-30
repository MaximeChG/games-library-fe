// Load database choices on the server and render the reusable game form.
import ConsoleDetailsFields from "@/src/components/games/console-details-fields";
import GameSubmitForm from "@/src/components/games/game-submit-form";
import MultiSelectField from "@/src/components/common/multi-select-field";
import { CheckboxField, InputField, SelectField, TextareaField } from "@/src/components/common/form-fields";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { GetGenres } from "@/src/api/genres";
import { GetInterests } from "@/src/api/interest";
import { GetConsoles } from "@/src/api/consoles";
import { GetStates } from "@/src/api/states";
import PageHeader from "@/src/components/common/page-header";
import PageLayout from "@/src/components/common/page-layout";

// The form options are live database data and should not be fetched during static generation.
export const dynamic = "force-dynamic";

export default async function NewGame() {
    const [genres, interests, consoles, playStates] = await Promise.all([
        GetGenres(),
        GetInterests(),
        GetConsoles(),
        GetStates()
    ]);

    return (
        <PageLayout>
            <PageHeader
                eyebrow="Library"
                title="Add a new game"
                actions={
                    <Link
                        href="/games"
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back to games
                    </Link>
                }
            />

            <GameSubmitForm>
                    <section className="space-y-4">
                        <div>
                            <h3 className="text-base font-semibold text-zinc-100">Game information</h3>
                            <p className="mt-1 text-sm text-zinc-500">Start with the basic details for this title.</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <InputField
                                id="title"
                                label="Title"
                                name="title"
                                type="text"
                                placeholder="Game title"
                                required
                                containerClassName="sm:col-span-2"
                            />
                            <InputField id="sortTitle" label="Sort title" name="sortTitle" type="text" placeholder="Optional" />
                            <InputField id="series" label="Series" name="series" type="text" placeholder="Optional" />
                            <InputField
                                id="imageURL"
                                label="Image URL"
                                name="imageURL"
                                type="url"
                                placeholder="https://"
                                containerClassName="sm:col-span-2"
                            />
                            <MultiSelectField
                                id="genres"
                                label="Genres"
                                name="genres"
                                options={genres}
                                placeholder="Select genres"
                                containerClassName="sm:col-span-2"
                            />
                        </div>
                    </section>

                    <div className="h-px bg-zinc-800" />

                    <section className="space-y-4">
                        <div>
                            <h3 className="text-base font-semibold text-zinc-100">Your progress</h3>
                            <p className="mt-1 text-sm text-zinc-500">Track your interest and current play status.</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <SelectField id="interest" label="Interest" name="interest" defaultValue="" required>
                                <option value="" disabled></option>
                                {interests.map((option) => (
                                    <option key={option.id} value={option.id}>{option.displayName}</option>
                                ))}
                            </SelectField>
                            <InputField id="rating" label="Rating" name="rating" type="text" placeholder="Optional" />
                            <SelectField
                                id="progress"
                                label="Progress"
                                name="progress"
                                defaultValue=""
                                required
                                containerClassName="sm:col-span-2"
                            >
                                <option value="" disabled></option>
                                {playStates.map((option) => (
                                    <option key={option.id} value={option.id}>{option.displayName}</option>
                                ))}
                            </SelectField>
                            <TextareaField
                                id="progressDescription"
                                label="Progress description"
                                name="progressDescription"
                                placeholder="Add notes about your progress..."
                                className="min-h-24 resize-y"
                                containerClassName="sm:col-span-2"
                            />
                            <CheckboxField
                                id="onList"
                                label="This game is an option for lists recommendations"
                                name="onList"
                                containerClassName="sm:col-span-2"
                            />
                        </div>
                    </section>

                    <div className="h-px bg-zinc-800" />

                    <ConsoleDetailsFields consoles={consoles} />

                    <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-end">
                        <Link
                            href="/games"
                            className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Add game
                        </button>
                    </div>
            </GameSubmitForm>
        </PageLayout>
    );
}