import { Command } from '../../types';
import { systemCommands } from './systemCommands';
import { networkCommands } from './networkCommands';
import { loreCommands } from './loreCommands';
import { experimentCommands } from './experimentCommands';
import { profileCommands } from './profileCommands';
import { tokenCommands } from './tokenCommands';
import { chatCommands } from './chatCommands';
import { manifestoCommands } from './manifestoCommands';
import { logCommands } from './logCommands';
import { apiCommands } from './apiCommands';

// Combine all commands into a single array
export const commands: Command[] = [
  ...systemCommands,
  ...networkCommands,
  ...loreCommands,
  ...experimentCommands,
  ...profileCommands,
  ...tokenCommands,
  ...chatCommands,
  ...manifestoCommands,
  ...logCommands,
  ...apiCommands
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