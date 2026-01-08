"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
  status: "active" | "inactive";
}

export default function TeamAdminPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Smith",
      role: "Lead VFX Artist",
      image: "/images/team/john.jpg",
      bio: "10+ years of experience in visual effects",
      order: 1,
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "3D Animator",
      image: "/images/team/sarah.jpg",
      bio: "Specialist in character animation",
      order: 2,
      status: "active",
    },
    {
      id: "3",
      name: "Mike Chen",
      role: "Compositor",
      image: "/images/team/mike.jpg",
      bio: "Expert in color grading and compositing",
      order: 3,
      status: "active",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  const handleStatusToggle = (id: string) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id
          ? { ...member, status: member.status === "active" ? "inactive" : "active" }
          : member
      )
    );
  };

  const handleSave = (member: TeamMember) => {
    if (editingMember) {
      setTeamMembers(
        teamMembers.map((m) => (m.id === member.id ? member : m))
      );
    } else {
      setTeamMembers([...teamMembers, { ...member, id: Date.now().toString() }]);
    }
    setEditingMember(null);
    setAddMemberModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
          <p className="text-gray-400">Manage your team profiles</p>
        </div>
        <button
          onClick={() => {
            setEditingMember(null);
            setAddMemberModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Search */}
      <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <span className="text-6xl">👤</span>
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    member.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-purple-400 text-sm">{member.role}</p>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{member.bio}</p>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                <button
                  onClick={() => {
                    setEditingMember(member);
                    setAddMemberModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleStatusToggle(member.id)}
                  className="px-3 py-2 text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:bg-gray-800 transition-all text-sm"
                >
                  {member.status === "active" ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl">
          <p className="text-gray-400">No team members found.</p>
        </div>
      )}

      {/* Add/Edit Member Modal */}
      {addMemberModalOpen && (
        <TeamMemberForm
          member={editingMember}
          onSave={handleSave}
          onCancel={() => {
            setEditingMember(null);
            setAddMemberModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

// Team Member Form Component
function TeamMemberForm({
  member,
  onSave,
  onCancel,
}: {
  member: TeamMember | null;
  onSave: (member: TeamMember) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<TeamMember>(
    member || {
      id: "",
      name: "",
      role: "",
      image: "",
      bio: "",
      order: 0,
      status: "active",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-gray-800 rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-white mb-6">
          {member ? "Edit Team Member" : "Add Team Member"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role *
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "inactive",
                })
              }
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              {member ? "Update" : "Add"} Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
