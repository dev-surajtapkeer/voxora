"use client";
import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, UserCheck, AlertCircle } from "lucide-react";
import { apiService } from "@/lib/api";
import { Alert, AlertDescription } from "../ui/alert";
import { DashboardStats, TeamStat, RecentAgent } from "@/lib/interfaces/admin";

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    overview: {
      totalTeams: 0,
      totalAgents: 0,
      onlineAgents: 0,
      pendingInvites: 0,
    },
    teamStats: [],
    recentAgents: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const api = apiService;

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      } else {
        setError("Failed to load dashboard data");
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("An error occurred while loading dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Teams</p>
              <h2 className="text-2xl font-bold">
                {isLoading ? "-" : stats.overview.totalTeams}
              </h2>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Agents</p>
              <h2 className="text-2xl font-bold">
                {isLoading ? "-" : stats.overview.totalAgents}
              </h2>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Online Agents</p>
              <h2 className="text-2xl font-bold">
                {isLoading ? "-" : stats.overview.onlineAgents}
              </h2>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Invites</p>
              <h2 className="text-2xl font-bold">
                {isLoading ? "-" : stats.overview.pendingInvites}
              </h2>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Team Performance</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/admin/team")}
          >
            View All Teams
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <Card className="p-6">
              <div className="animate-pulse h-20"></div>
            </Card>
          ) : stats.teamStats.length > 0 ? (
            stats.teamStats.map((team: TeamStat) => (
              <Card key={team._id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: team.color || "#3b82f6" }}
                    >
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{team.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Agents</p>
                    <p className="font-semibold">{team.agentCount}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Online</p>
                    <p className="font-semibold text-green-600">
                      {team.onlineAgents}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 p-6 text-center border rounded-lg border-dashed border-gray-300">
              <p className="text-gray-500">No teams created yet</p>
              <Button
                size="sm"
                className="mt-2"
                onClick={() => (window.location.href = "/admin/team")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Team
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Agents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Agents</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/admin/agent")}
          >
            View All Agents
          </Button>
        </div>
        {isLoading ? (
          <Card className="p-6">
            <div className="animate-pulse h-20"></div>
          </Card>
        ) : stats.recentAgents.length > 0 ? (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentAgents.map((agent: RecentAgent) => (
                    <tr
                      key={agent._id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{agent.name || "No name"}</td>
                      <td className="px-4 py-3">{agent.email}</td>
                      <td className="px-4 py-3">{agent.role}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            agent.inviteStatus === "active"
                              ? "bg-green-100 text-green-800"
                              : agent.inviteStatus === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {agent.inviteStatus || "Unknown"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {new Date(agent.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <div className="p-6 text-center border rounded-lg border-dashed border-gray-300">
            <p className="text-gray-500">No agents added yet</p>
            <Button
              size="sm"
              className="mt-2"
              onClick={() => (window.location.href = "/admin/agent")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Invite Agent
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
