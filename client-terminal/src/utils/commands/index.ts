import type { Command } from '../../types';
import { systemCommands } from './systemCommands';
import { networkCommands } from './networkCommands';
import { chatCommands } from './chatCommands';
import { apiCommands } from './apiCommands';
import { helpCommands } from './helpCommands';

// Combine all commands into a single array
export const commands: Command[] = [
  ...systemCommands,
  ...networkCommands,
  ...chatCommands,
  ...apiCommands,
  ...helpCommands
].sort((a, b) => a.command.localeCompare(b.command));

// Helper function to get commands by category
export const getCommandsByCategory = (category?: string): Command[] => {
  const allCommands = commands.filter(cmd => !cmd.hidden);
  if (!category) return allCommands;
  return allCommands.filter(cmd => cmd.category === category);
};

// Helper function to get command categories
export const getCategories = (): string[] => {
  const categories = new Set(commands.map(cmd => cmd.category));
  return Array.from(categories).sort();
};