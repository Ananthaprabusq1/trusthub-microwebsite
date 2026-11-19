"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { LuCircleHelp, LuSlidersHorizontal } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  FeaturesWorkspaceAdministrationContent,
  WorkspaceMemberRole,
  WorkspaceMemberRowItem,
  WorkspaceSettingIcon,
} from "@/types/features";

interface WorkspaceAdministrationWindowProps {
  data: FeaturesWorkspaceAdministrationContent["previewWindow"];
}

function SettingRowIcon({ type }: { type: WorkspaceSettingIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[#28B446]";
  if (type === "support") {
    return <LuCircleHelp aria-hidden="true" className={iconClass} />;
  }
  return <LuSlidersHorizontal aria-hidden="true" className={iconClass} />;
}

export function WorkspaceAdministrationWindow({
  data,
}: WorkspaceAdministrationWindowProps) {
  const [members, setMembers] = useState<WorkspaceMemberRowItem[]>(
    data.members
  );
  const [roleMap, setRoleMap] = useState<Record<string, WorkspaceMemberRole>>(
    () =>
      Object.fromEntries(
        data.members.map((member) => [member.id, member.defaultRole])
      )
  );

  const handleCycleRole = (id: string, currentRole: WorkspaceMemberRole) => {
    const currentIndex = data.roles.indexOf(currentRole);
    const nextRole =
      data.roles[(currentIndex + 1) % data.roles.length] ?? currentRole;
    setRoleMap((prev) => ({ ...prev, [id]: nextRole }));
  };

  const handleAddMember = () => {
    if (members.length > data.members.length) {
      setMembers(data.members);
      return;
    }

    const newMember: WorkspaceMemberRowItem = {
      id: "member-security-lead",
      title: "Security lead",
      subtitle: "Roles & permissions",
      defaultRole: "Editor",
    };

    setMembers((prev) => [...prev, newMember]);
    setRoleMap((prev) => ({ ...prev, [newMember.id]: newMember.defaultRole }));
  };

  return (
    <TiltCard maxTilt={1.6}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-[#F8FAFC] shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[#28B446]/35 hover:shadow-[0_32px_72px_-16px_rgba(40,180,70,0.18)] sm:rounded-3xl">
        {/* Top macOS Window Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200/70 bg-[#F4F6F9] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#28B446]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#28B446]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#28B446]/60" />
          </div>
          <span className="text-xs font-medium text-[#64748B]">
            {data.windowTitle}
          </span>
        </div>

        {/* Window Body */}
        <div className="bg-white p-5 sm:p-7">
          {/* Header Row: Team members + Add member button */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-bold tracking-tight text-[#111827] sm:text-base">
              {data.panelHeading}
            </h3>

            <button
              type="button"
              onClick={handleAddMember}
              className="cursor-pointer rounded-xl border border-slate-800 bg-white px-4 py-2 text-xs font-semibold text-[#111827] transition-colors duration-200 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28B446]"
            >
              {data.addMemberLabel}
            </button>
          </div>

          {/* Team Members List */}
          <div className="mt-4 space-y-2.5">
            {members.map((member) => {
              const currentRole = roleMap[member.id] ?? member.defaultRole;
              const isAdmin = currentRole === "Admin";

              return (
                <motion.div
                  key={member.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[#28B446]/35 hover:bg-[#F9FDFB] sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-9 w-9 shrink-0 rounded-full bg-[#E8F5EC]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#111827] sm:text-[13.5px]">
                        {member.title}
                      </p>
                      <p className="text-[11px] text-[#64748B]">
                        {member.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCycleRole(member.id, currentRole)}
                    aria-label={`Change role for ${member.title}, currently ${currentRole}`}
                    className={`shrink-0 cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28B446] ${
                      isAdmin
                        ? "bg-[#18181B] text-white hover:bg-[#27272A]"
                        : "border border-slate-200/90 bg-white font-medium text-[#64748B] hover:border-slate-300 hover:text-[#111827]"
                    }`}
                  >
                    {currentRole}
                  </button>
                </motion.div>
              );
            })}

            {/* Workspace Settings & Support Contact Rows */}
            {data.settingsRows.map((setting) => (
              <motion.div
                key={setting.id}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[#28B446]/35 hover:bg-[#F9FDFB] sm:px-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5EC]">
                  <SettingRowIcon type={setting.icon} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#111827] sm:text-[13.5px]">
                    {setting.title}
                  </p>
                  <p className="text-[11px] text-[#64748B]">
                    {setting.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}