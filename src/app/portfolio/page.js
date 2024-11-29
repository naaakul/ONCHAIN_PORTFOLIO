"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Linkedin,
  Twitter,
  ExternalLink,
  Briefcase,
  FolderGit2,
  PanelsTopLeft,
} from "lucide-react";
import { CONTRACT_ADDRESS } from "../constants";
import abi from "../contract/abi.json";
import { useAccount, useReadContract } from "wagmi";

export default function PortfolioPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address } = useAccount();
  const [portfolioData, setPortfolioData] = useState();

  const { data: isAccountData, error: isAccountError } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getAllWork",
    args: [],
  });

  useEffect(() => {
    if (isAccountData !== undefined) {
      console.log("isAccountData:", isAccountData);
      if (isAccountData == true) {
        console.log("Account exists" + isAccountData);
      } else {
        console.log("Account does not exist" + isAccountData + isAccountError);
      }
    }
  }, [isAccountData, isAccountError, address]);

  useEffect(() => {
    const basicInfo = JSON.parse(
      localStorage.getItem("portfolioBasicInfo") || "{}"
    );
    const experiences = JSON.parse(
      localStorage.getItem("portfolioExperiences") || "[]"
    );
    const projects = JSON.parse(
      localStorage.getItem("portfolioProjects") || "[]"
    );
    setPortfolioData({ basicInfo, experiences, projects });
  }, []);

  if (!portfolioData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="container flex h-14 items-center">
          <div className=" justify-center w-full hidden md:flex">
            <ConnectButton />
          </div>
          <div className=" justify-center w-full hidden md:flex">
            <Link href="/" className=" flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Portfolio Builder
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Link href="/form/experience">
                <Button className="gradient-button text-white">
                  <span>Add Experience</span>
                </Button>
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
          <Card className="glass md:sticky md:top-20 md:h-fit">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://pbs.twimg.com/profile_images/1861429224390758400/mU156qMv_400x400.jpg"
                  alt="Nakul Chouksey"
                  className="w-32 h-32 rounded-full mb-4 border-2 border-pink-500"
                />
                <h1 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Nakul Chouksey
                </h1>
                <p className="text-gray-400 mb-4">
                  Nakul Chouksey is the best Ctrl+C Ctrl+V 
                </p>
                <div className="flex space-x-4 mb-4">
                  <a
                    href="https://x.com/Bhopal_Dao"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
                    >
                      <PanelsTopLeft className="h-4 w-4" />
                    </Button>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/nakul-chouksey"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </a>

                  <a
                    href="https://x.com/heynakul"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Blockchain",
                    "Web 3",
                    "Web 2",
                    "AI-ML",
                    "Design",
                    "NFT",
                    "DeFi",
                    "Web3",
                    "Community Building",
                    "Open Source",
                  ].map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className="glass overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                  <h2 className="text-xl font-semibold mb-2 flex items-center text-white">
                    <Briefcase className="mr-2" /> Experience
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  {isAccountData?.map((exp, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 rounded-xl p-6 mb-4 hover:bg-gray-800/70 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                          {exp.role}
                        </h3>
                        <Badge
                          variant="outline"
                          className="border-pink-500 text-pink-400"
                        >
                          {exp.company}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      <div className="flex justify-end">
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                        >
                          View Project <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="glass overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
                  <h2 className="text-xl font-semibold mb-2 flex items-center text-white">
                    <FolderGit2 className="mr-2" /> Projects
                  </h2>
                </div>
                <div className="p-4 grid gap-4 md:grid-cols-2">
                  {portfolioData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <h3 className="font-semibold text-cyan-400 flex items-center justify-between">
                        {project.name}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </h3>
                      <p className="mt-2 text-gray-300 text-sm">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
