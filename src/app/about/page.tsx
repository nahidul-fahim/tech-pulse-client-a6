"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Users, Lightbulb, Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in tech, Alice founded Tech Pulse to make technology accessible to everyone.",
    image: "/person/1.png",
    social: {
      github: "",
      linkedin: "",
      twitter: ""
    }
  },
  {
    name: "Bob Smith",
    role: "CTO",
    bio: "Bob brings 10 years of software engineering expertise, ensuring our platform runs smoothly and securely.",
    image: "/person/2.png",
    social: {
      github: "",
      linkedin: ""
    }
  },
  {
    name: "Carol Martinez",
    role: "Head of Content",
    bio: "Carol's background in tech journalism helps shape our content strategy and ensure quality across all posts.",
    image: "/person/3.png",
    social: {
      linkedin: "",
      twitter: ""
    }
  },
  {
    name: "David Lee",
    role: "Community Manager",
    bio: "David fosters our vibrant community, moderating discussions and organizing virtual events.",
    image: "/person/1.png",
    social: {
      linkedin: "",
      twitter: ""
    }
  }
];

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">About Tech Pulse</h1>

        <Card className="mb-8 shadow">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
              <AlertCircle className="mr-2" /> Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <p>
              At Tech Pulse, our mission is to democratize technology knowledge. We strive to empower individuals with practical tech solutions, tutorials, and insights that enhance their digital lives. Our platform is designed to make complex tech concepts accessible to everyone, regardless of their background or expertise level.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
              <Lightbulb className="mr-2" /> Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="text-body">
            <p>
              We envision a world where technology is a tool for empowerment, creativity, and problem-solving. Our goal is to create a global community of tech-savvy individuals who can confidently navigate the digital landscape, foster innovation, and drive positive change through technology.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
              <Users className="mr-2" /> Our Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full" />
                      <div>
                        <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
                        <p className="text-sm text-secondary">{member.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-body mb-4">{member.bio}</p>
                    <div className="flex space-x-2">
                      {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;