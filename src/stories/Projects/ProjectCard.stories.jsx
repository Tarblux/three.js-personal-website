import ProjectCard from '../../components/Projects/ProjectCard';

export default {
    title: 'Projects/ProjectCard',
    component: ProjectCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        title: { control: 'text' },
        date: { control: 'text' },
        image: { control: 'text' },
        description: { control: 'text' },
        category: { control: 'text' },
        technologies: { control: 'array' }
    }
};

// Default template
const Template = (args) => <ProjectCard {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
    title: "Test Project",
    date: "Dec '24 - Present · 1 mo",
    image: "/images/project-creo.png",
    description: "Test project description",
    category: "Research",
    technologies: ["Test Technology 1", "Test Technology 2", "Test Technology 3"]
};

// Web Development Project
export const WebDevelopment = Template.bind({});
WebDevelopment.args = {
    title: "Three.js Personal Website",
    date: "2024 - Present",
    image: "/images/project-tester.png",
    description: "Interactive 3D portfolio website with modern tech stack",
    category: "Web Development",
    technologies: ["Three.js", "React", "Node.js", "PostgreSQL"]
};

// Long Content
export const LongContent = Template.bind({});
LongContent.args = {
    title: "Very Long Project Title That Might Need Special Handling",
    date: "Jan '23 - Dec '23 · 12 mo",
    image: "/images/project-leet.png",
    description: "This is a very long description that demonstrates how the card handles extended content. It should wrap properly and maintain the card's layout integrity.",
    category: "Development",
    technologies: ["Technology 1", "Technology 2", "Technology 3", "Technology 4", "Technology 5", "Technology 6"]
};

// No Image
export const NoImage = Template.bind({});
NoImage.args = {
    title: "Project Without Image",
    date: "2024",
    description: "This variant shows how the card looks without an image.",
    category: "Design",
    technologies: ["Figma", "Sketch"],
    image: ""
}; 