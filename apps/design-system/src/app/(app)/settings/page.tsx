import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      eyebrow="Settings"
      title="Workspace, auth, and integrations."
      description="Admin sign-in, role management (browse vs edit), and Figma sync settings live here."
      icon="settings"
      next={[
        "Admin auth (sign in / sign out)",
        "Role-based permissions (admin · designer · viewer)",
        "Figma library sync configuration",
      ]}
    />
  );
}
