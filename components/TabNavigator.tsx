"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils"; // Ensure you have cn util or use clsx
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabNavigatorProps {
  tabs: Tab[];
}

export default function TabNavigator({ tabs }: TabNavigatorProps) {
  const defaultTab = tabs[0]?.label || "";

  return (
    <Tabs.Root defaultValue={defaultTab} className="w-full">
      <ScrollArea className="w-full overflow-x-auto">
        <Tabs.List
          className="flex w-full border-b border-border bg-muted p-1 space-x-2 rounded-xl"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.label}
              value={tab.label}
              className={cn(
                "whitespace-nowrap rounded-lg px-5 py-2 text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-primary hover:bg-accent",
                "data-[state=active]:bg-white data-[state=active]:text-[#0E9696] data-[state=active]:shadow"
              )}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </ScrollArea>

      <div className="mt-6">
        {tabs.map((tab) => (
          <Tabs.Content key={tab.label} value={tab.label} className="focus:outline-none">
            <Card className="bg-background shadow-md">
              <CardContent className="p-6">{tab.content}</CardContent>
            </Card>
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
