"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../../constants";
import abi from "../../contract/abi.json";

export default function ExperienceForm() {
  const [pow, setpow] = useState({
    company: "",
    link: "",
    position: "",
    description: "",
  });

  const {
    data,
    error,
    writeContract: createUserWriteContract,
  } = useWriteContract();

  const createPOW = async () => {
    try {
      console.log("createPOW function called");
      console.log(pow)

      createUserWriteContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "addWork",
        args: [pow.position, pow.description, pow.link, pow.company,],
      });

    } catch (error) {
      console.error("Error during submission:", error);
      alert("Error during submission");
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      alert("pow created successfully");
      console.log(data);
    } if (error !== null) {
      console.log(error)
      alert("Error creating user");
    }
  }, [data, error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Portfolio Builder
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Link href="/portfolio">
                <Button className="gradient-button text-white">
                  <span>View Portfolio</span>
                </Button>
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2 mb-4 p-4 border rounded border-gray-700">
                <Input
                  value={pow.company}
                  onChange={(e) =>
                    setpow({ ...pow, company: e.target.value })
                  }
                  placeholder="Company"
                  className="bg-gray-800 text-white border-gray-700"
                />
                <Input
                  value={pow.link}
                  onChange={(e) =>
                    setpow({ ...pow, link: e.target.value })
                  }
                  placeholder="Link"
                  className="bg-gray-800 text-white border-gray-700"
                />
                <Input
                  value={pow.position}
                  onChange={(e) =>
                    setpow({ ...pow, position: e.target.value })
                  }
                  placeholder="Position"
                  className="bg-gray-800 text-white border-gray-700"
                />
                <Textarea
                  value={pow.description}
                  onChange={(e) =>
                    setpow({
                      ...pow,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>

              <div className=" justify-between flex">
                <Button type="button" onClick={() => createPOW()} className="gradient-button text-white">
                  <span>Add Experience</span>
                </Button>
                <div className="flex justify-between"></div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
