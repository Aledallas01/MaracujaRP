import React from "react";
import { RuleSection } from "../../types";
import { FileText, Users, Palmtree, AlertTriangle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

interface AdminStatsProps {
  sections: RuleSection[];
}

const AdminStats: React.FC<AdminStatsProps> = ({ sections }) => {
  const totalRules = sections.reduce(
    (total, section) => total + section.rules.length,
    0
  );

  const sectionStats = sections.map((section) => ({
    ...section,
    ruleCount: section.rules.length,
    percentage: (section.rules.length / totalRules) * 100,
  }));

  const iconMap = {
    Shield: Palmtree,
    Users,
    Heart: Palmtree,
    AlertTriangle,
  };

  // Funzione per trovare l'ultima data di modifica tra tutte le regole
  const getLastUpdatedDate = () => {
    const allDates = sections
      .flatMap((section) =>
        section.rules.map((rule) => rule.updatedAt && new Date(rule.updatedAt))
      )
      .filter((date): date is Date => date instanceof Date);

    if (allDates.length === 0) return null;

    return new Date(Math.max(...allDates.map((d) => d.getTime())));
  };

  const lastUpdated = getLastUpdatedDate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-teal-200">Panoramica generale del regolamento.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Totale regole */}
        <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-200 text-sm font-medium">Regole Totali</p>
              <p className="text-2xl font-bold text-white">{totalRules}</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-lg shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Totale sezioni */}
        <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-200 text-sm font-medium">
                Sezioni Attive
              </p>
              <p className="text-2xl font-bold text-white">{sections.length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-lg shadow-lg">
              <Palmtree className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Media regole */}
        <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-200 text-sm font-medium">
                Media per Sezione
              </p>
              <p className="text-2xl font-bold text-white">
                {sections.length > 0
                  ? Math.round(totalRules / sections.length)
                  : 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Ultima modifica */}
        <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-200 text-sm font-medium">
                Ultima Modifica
              </p>
              <p className="text-2xl font-bold text-white">
                {lastUpdated
                  ? formatDistanceToNow(lastUpdated, {
                      addSuffix: true,
                      locale: it,
                    })
                  : "Mai"}
              </p>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-lg shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Distribuzione */}
      <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Distribuzione Regole per Sezione
        </h3>
        <div className="space-y-4">
          {sectionStats.map((section) => {
            const IconComponent =
              iconMap[section.icon as keyof typeof iconMap] || Palmtree;

            return (
              <div key={section.id} className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg shadow-lg">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">
                      {section.title}
                    </span>
                    <span className="text-teal-200 text-sm">
                      {section.ruleCount} regole
                    </span>
                  </div>
                  <div className="w-full bg-teal-700/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${section.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-teal-200 text-sm font-medium">
                  {section.percentage.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
