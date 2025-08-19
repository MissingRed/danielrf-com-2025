"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Calendar,
  HardDrive,
  AlertCircle,
} from "lucide-react";

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  languages?: { [key: string]: number };
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  size: number;
  open_issues_count: number;
};

export default function Projects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} días`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "mes" : "meses"}`;
    }
  };

  // Helper function to format file size
  const formatSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) {
      return `${sizeInKB} KB`;
    } else {
      const sizeInMB = (sizeInKB / 1024).toFixed(1);
      return `${sizeInMB} MB`;
    }
  };

  // Fetch repositories from GitHub API
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);

        // Fetch repositories
        const reposResponse = await fetch(
          "https://api.github.com/users/MissingRed/repos"
        );
        const reposData = await reposResponse.json();

        // Filter out forks and get only repositories with descriptions
        const filteredRepos = reposData.filter(
          (repo: any) =>
            !repo.fork && repo.description && repo.description.trim() !== ""
        );

        // Fetch languages for each repository
        const reposWithLanguages = await Promise.all(
          filteredRepos.map(async (repo: any) => {
            try {
              const languagesResponse = await fetch(repo.languages_url);
              const languagesData = await languagesResponse.json();

              // Convert languages object to topics array and get primary language
              const languageTopics = Object.keys(languagesData).map((lang) =>
                lang.toLowerCase()
              );

              return {
                id: repo.id,
                name: repo.name,
                description: repo.description || "",
                html_url: repo.html_url,
                homepage: repo.homepage || "",
                topics: [...languageTopics, ...repo.topics],
                language: repo.language || "Unknown",
                languages: languagesData,
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                updated_at: repo.updated_at,
                size: repo.size,
                open_issues_count: repo.open_issues_count,
              };
            } catch (error) {
              console.error(
                `Error fetching languages for ${repo.name}:`,
                error
              );
              return {
                id: repo.id,
                name: repo.name,
                description: repo.description || "",
                html_url: repo.html_url,
                homepage: repo.homepage || "",
                topics: repo.topics,
                language: repo.language || "Unknown",
                languages: {},
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                updated_at: repo.updated_at,
                size: repo.size,
                open_issues_count: repo.open_issues_count,
              };
            }
          })
        );

        setRepos(reposWithLanguages);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        // Fallback to empty array if API fails
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filteredRepos =
    activeTab === "all"
      ? repos
      : repos.filter((repo) =>
          repo.topics.some(
            (topic) =>
              topic.toLowerCase().includes(activeTab.toLowerCase()) ||
              (activeTab === "nodejs" && topic.toLowerCase().includes("node"))
          )
        );

  return (
    <section id="projects" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proyectos Destacados
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selección de mis recientes proyectos de desarrollo full-stack
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <Tabs
              defaultValue="all"
              className="mb-8"
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                  <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span>{repo.name}</span>
                        <Badge variant="outline">{repo.language}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">
                        {repo.description}
                      </p>

                      {/* Repository Stats */}
                      <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          <span>{repo.forks_count}</span>
                        </div>
                        {/* <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(repo.updated_at)}</span>
                        </div> */}
                        <div className="flex items-center gap-1">
                          <HardDrive className="h-3 w-3" />
                          <span>{formatSize(repo.size)}</span>
                        </div>
                        {repo.open_issues_count > 0 && (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            <span>{repo.open_issues_count} issues</span>
                          </div>
                        )}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {/* Show main language */}
                        {repo.language && (
                          <Badge
                            key={repo.language}
                            variant="secondary"
                            className="text-xs"
                          >
                            {repo.language}
                          </Badge>
                        )}
                        {/* Show additional languages from the languages API */}
                        {repo.languages &&
                          Object.keys(repo.languages)
                            .filter((lang) => lang !== repo.language)
                            .slice(0, 3)
                            .map((lang) => (
                              <Badge
                                key={lang}
                                variant="outline"
                                className="text-xs"
                              >
                                {lang}
                              </Badge>
                            ))}
                        {/* Show topics if any */}
                        {repo.topics
                          .filter(
                            (topic) =>
                              !Object.keys(repo.languages || {})
                                .map((l) => l.toLowerCase())
                                .includes(topic.toLowerCase())
                          )
                          .slice(0, 2)
                          .map((topic) => (
                            <Badge
                              key={topic}
                              variant="secondary"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Source
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button variant="default" size="sm" asChild>
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
