// Edit this file to personalise the portfolio. All text below is sample content.
export const profile = {
  name: 'Rey Francis Morata',
  course: 'Bachelors in Science and Information Technology',
  year: '4th year',
  section: '1561',
  photo: `${import.meta.env.BASE_URL}assets/rey-francis-morata.png`,
  intro: [
    'I’m Rey! When I’m not working on my 4th-year IT projects, you can usually find me lost in a fantasy novel or writing stories of my own. From drafting fan fiction to world-building an entire original universe for Dungeons & Dragons, I love bringing imaginative worlds to life.',
  ],
  expectations:
    'I expected a long reading list and a lot of dates. What I found was a conversation across centuries: authors answering one another, and a classroom where a single line could hold forty minutes of debate. I hoped to learn to read slowly, and to say something true about what I read.',
};

export const recentBooks = [
  {
    title: 'Making Magic',
    author: 'Aloha Zachou',
    review:
      'A relaxed adventure of a witch roaming the lands. I find this to be a fun, cozy read, and I particularly like how the story presents the plot from a future perspective. Watching the witch reminisce about the past which each volume focuses on before jumping ahead to show what happens multiple years later is really rewarding, as it highlights the long-term influence she leaves on the people and places she visits.',
    cover: '',
  },
  {
    title: 'tenten-kakumei',
    author: 'Piero Karasu',
    review:
      'A heartwarming romance where love comes above all else, showing us that people will do anything for the ones they care about. At the same time, it carries a bittersweet weight teaching us that to truly love something sometimes means letting it go, and highlighting the quiet sadness that comes with immortality and facing the eventual death of the person you love.',
    cover: '',
  },
  {
    title: "I'm in Love with the Villainess",
    author: 'Inori',
    review:
      'The later volumes of this series wildly differed from what I was expecting, and I think that actually fits the story really well. It shifts to focus heavily on challenging and disproving modern societal norms within a fantasy setting, while also exploring a much darker side of affection showing how love can spiral into obsession and desperation, how giving too much love can eventually leave you empty, and what deep loneliness can do to someone. Despite the heavy turns, or maybe because of them, I absolutely love this series for how fearless it is with its characters and themes.',
    cover: '',
  },
  {
    title: 'Dear Evan Hansen',
    author: 'Val Emmich',
    review:
      "Personally, I hated how rambly and ranty Evan is in this story, though it perfectly captures his personality as an anxious 'nobody.' He uses the death of a classmate to prop himself up, giving himself a glimpse of a life and connection he never had, only for it all to come crashing down when the truth finally comes to light. While the overall result had positive ripples he got Connor a memorial and inspired people to reach out so nobody feels alone he completely rewrote who Connor actually was as a person. He essentially invented his own version of Connor for the world to remember, meaning the real Connor disappeared just for the sake of Evan's lie.",
    cover: '',
  },
];

export type Analysis = {
  id: number; title: string; author: string; lens: string; hue: string; glyph: string;
  sections: { heading: string; body: string[] }[];
};

const mk = (id: number, title: string, author: string, lens: string, hue: string, glyph: string, thesis: string, close: string, ev: string): Analysis => ({
  id, title, author, lens, hue, glyph,
  sections: [
    { heading: 'Introduction & Thesis', body: [thesis] },
    { heading: 'Literary Lens & Method', body: [`Through the ${lens} lens, I read the text for what it reveals beneath its plot: whose voices carry authority, what the narrative desires, and what it cannot say aloud. This lens turns familiar scenes into evidence.`] },
    { heading: 'Close Analysis', body: [ev, 'Taken together, these moments show that the work is not merely telling a story but arguing a position about human experience, and doing so through form as much as content.'] },
    { heading: 'Conclusion', body: [close] },
  ],
});

export const analyses: Analysis[] = [
  mk(1, 'The Song of Roland', 'Anonymous', 'Historical / Cultural', '#7b2638', 'R',
    'The Song of Roland transforms a military defeat into a heroic legend, using loyalty, faith, and sacrifice to define the ideals of medieval knighthood.',
    'The poem endures as both a stirring heroic song and a record of how cultures reshape history to express the values they wish to preserve.',
    'Roland’s refusal to sound his horn until disaster is unavoidable makes courage inseparable from pride. His final actions turn personal defeat into communal and spiritual victory.'),
  mk(2, 'The Iliad', 'Homer', 'Archetypal / Heroic', '#8a3b2a', 'Ι',
    'The Iliad presents heroism as both magnificent and destructive, revealing how the pursuit of honor can consume individuals, families, and entire communities.',
    'The epic’s final movement from rage toward recognition suggests that shared grief can briefly overcome even the deepest divisions of war.',
    'Achilles’ withdrawal and return make his anger the poem’s central force. His meeting with Priam restores his capacity to see an enemy not as a symbol, but as another grieving human being.'),
  mk(3, 'The Odyssey', 'Homer', 'Archetypal / Mythic', '#6a359c', 'Ω',
    'In The Odyssey, the hero’s journey home is less a voyage across the sea than a recovery of identity, and Odysseus becomes whole only when he reclaims his name.',
    'The epic endures because its archetypes—the wanderer, the faithful house, and the descent into the underworld—still map how we imagine return and belonging.',
    'When Odysseus calls himself “Nobody” to the Cyclops, cleverness saves him, yet the boast that follows nearly dooms him. Homer shows that identity is both a shield and a risk.'),
  mk(4, 'The Ramayana', 'Valmiki', 'Ethical / Cultural', '#a44a27', 'र',
    'The Ramayana examines duty through characters whose devotion to family, kingdom, and moral law demands extraordinary sacrifice.',
    'Its lasting complexity comes from the tension between ideal conduct and the human pain produced when duty is followed without compromise.',
    'Rama’s exile, Sita’s endurance, and Bharata’s refusal to seize the throne present different expressions of loyalty. Their choices show that dharma is not simple obedience but a demanding moral negotiation.'),
  mk(5, 'The Book of Job', 'Hebrew Wisdom Literature', 'Existential / Theological', '#3b6a9c', 'א',
    'The Book of Job challenges the belief that suffering always reflects personal guilt, refusing easy explanations for why a righteous person experiences loss.',
    'Rather than resolving every question, the text preserves the dignity of asking and portrays faith as something capable of surviving uncertainty.',
    'Job’s friends defend a neat moral system in which suffering must be deserved, while Job insists on the truth of his innocence. Their debate exposes the cruelty that certainty can produce in the face of another person’s pain.'),
  mk(6, 'The Mahabharata', 'Vyasa', 'Philosophical / Ethical', '#2f7a5a', 'म',
    'The Mahabharata portrays moral life as a field of competing obligations where even honorable choices can lead to devastating consequences.',
    'The epic’s greatness lies in its refusal to reduce dharma to a single rule; instead, it asks readers to weigh intention, responsibility, and consequence together.',
    'Arjuna’s crisis before battle gives personal form to the epic’s central conflict. His dialogue with Krishna explores action, detachment, and the burden of fulfilling one’s role in an imperfect world.'),
  mk(7, 'The Tale of Genji', 'Murasaki Shikibu', 'Psychological / Cultural', '#9c3569', '源',
    'The Tale of Genji uses courtly romance to explore impermanence, memory, and the emotional consequences hidden beneath refined social rituals.',
    'Its careful attention to interior life makes the distant Heian court feel intimate while revealing the unequal freedoms available to men and women.',
    'Genji’s relationships are shaped by beauty, rank, and longing, yet their aftermath often falls most heavily on the women around him. Seasonal imagery mirrors the fragility of affection and status.'),
];

export const favorite = {
  title: 'The Song of Roland', author: 'Anonymous', era: 'Medieval French Epic · c. 11th Century',
  tabs: [
    { key: 'Overview', body: 'The Song of Roland is a medieval French epic centered on the Battle of Roncevaux Pass. It follows Roland, one of Charlemagne’s greatest warriors, as betrayal leaves his rearguard surrounded and forces him to choose between calling for help and defending his honor.' },
    { key: 'Why I Chose It', body: 'I chose this work because its heroic action carries a surprisingly complicated lesson. Roland’s courage is admirable, but the same pride that makes him appear heroic also prevents him from asking for help until it is too late.' },
    { key: 'Themes', body: 'The epic explores loyalty, honor, faith, sacrifice, betrayal, and the cost of pride. It also shows how a culture can transform historical defeat into a legendary story about courage and collective identity.' },
    { key: 'Characters & Lessons', body: 'Roland represents extraordinary bravery as well as dangerous pride. Oliver offers wisdom and restraint, while Ganelon demonstrates how resentment can grow into betrayal. Together, they show that courage is strongest when it is balanced by judgment and loyalty.' },
    { key: 'Personal Connections', body: 'Roland’s refusal to sound his horn reminded me that determination can become harmful when it prevents someone from accepting support. The story made me think about the difference between facing a challenge bravely and insisting on facing it alone.' },
  ],
};

export const learning = [
  { icon: 'hourglass', title: 'Historical Periods & Cultures', body: 'From Homeric Greece to modern Latin America, I learned that every text is shaped by its moment, and that knowing the moment sharpens the reading.' },
  { icon: 'lens', title: 'Application of Literary Lenses', body: 'Feminist, psychoanalytic, postcolonial, and archetypal approaches became tools I could pick up deliberately, each showing a different layer of the same page.' },
  { icon: 'heart', title: 'Literature as a Reflection of Humanity', body: 'Across millennia, the same fears, loves, and questions return. Great books last because they keep telling us the truth about ourselves.' },
  { icon: 'quill', title: 'Critical Thinking & Analytical Skills', body: 'I learned to build a claim, support it with textual evidence, and revise it when the text pushes back.' },
];

export const reflections = [
  {
    title: 'Reframing, Not Replacing, My Appreciation',
    body: `I wouldn’t say my appreciation changed all that much  rather, the course reframed how I approach what I read. I’ve always liked digging beneath the surface of stories to see how they tick, which is actually what got me into worldbuilding in the first place. Now, instead of just looking at a story as a reader or a hobbyist writer, I have actual terminology and structured ways to break down why certain narrative choices work so well.`,
  },
  {
    title: 'Overcoming Niche Reading Habits and Attention Spans',
    body: `Honestly, the biggest challenge for me was a lack of initial interest. Because I usually read very niche subjects and genres, combined with how much my attention span has deteriorated over time, pushing through dense classic literature felt like a chore. I overcame it by treating those classics the same way I treat my favorite fantasy stories  breaking the reading into smaller chunks and focusing on the underlying mechanics of the plot rather than forcing myself to love the style right away.`,
  },
  {
    title: 'The Power of the Marxist Lens',
    body: `The Marxist lens has easily been the most influential for me. As someone currently trying to flesh out my own fictional world, working out the economic and social systems of how a society actually functions is the most intriguing part of storytelling. It exposes the dark underside of a narrative and shows how power dynamics drive conflict, allowing you to realistically foresee how events would play out once you understand the framework of that world.`,
  },
  {
    title: 'Stripping Away Decor and Human Nature',
    body: `One of the biggest realizations I’ve taken away is how much we take ordinary life for granted, and how fragile social masks really are. Literature constantly shows that the moment a person's life, status, or comfort is threatened, all the polite decorum and lies strip away. In those high-stakes moments, you get to see who people truly are underneath  both the worst of human selfishness and the best of human resilience.`,
  },
  {
    title: 'Applying Literary Frameworks to Worldbuilding',
    body: `Personally, I’ve already put a lot of what we learned to use in improving my own worldbuilding project. Having a structured literary framework to follow has really helped rein in the "feature creep" of my story, keeping my ideas grounded and purposeful. Viewing my own writing through different literary lenses lets me build a living, breathing world that extends far past the written words on a page, a habit of structured, critical thinking that I know will also carry over into my future career.`,
  },
];

export const references = [
  'The Song of Roland. Anonymous medieval French epic.',
  'Homer. The Iliad.',
  'Homer. The Odyssey. Trans. Emily Wilson. W. W. Norton, 2018.',
  'Valmiki. The Ramayana.',
  'The Book of Job. Hebrew wisdom literature.',
  'Vyasa. The Mahabharata.',
  'Murasaki Shikibu. The Tale of Genji.',
  'Course lectures, class discussions, and instructor handouts.',
];
