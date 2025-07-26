// src/lib/api.ts
import { createClient } from "@supabase/supabase-js";
import { RuleSection, Rule } from "../types";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

/* ---------- RULES ---------- */
export const rulesAPI = {
  getRules: async (): Promise<Rule[]> => {
    const { data, error } = await supabase
      .from("rules")
      .select("*")
      .order("order_index");
    if (error) throw error;
    return data.map((rule) => ({
      id: rule.id,
      title: rule.title,
      content: rule.content,
      orderIndex: rule.order_index,
      createdBy: rule.created_by,
      createdAt: rule.created_at,
      updatedAt: rule.updated_at,
    }));
  },

  createRule: async (rule: {
    sectionId: string;
    title: string;
    content: string;
    orderIndex?: number;
  }): Promise<Rule> => {
    const { data, error } = await supabase
      .from("rules")
      .insert({
        section_id: rule.sectionId,
        title: rule.title,
        content: rule.content,
        order_index: rule.orderIndex ?? 0,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      orderIndex: data.order_index,
      createdBy: data.created_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  updateRule: async (
    id: string,
    updates: {
      title?: string;
      content?: string;
      orderIndex?: number;
      sectionId?: string;
    }
  ): Promise<Rule> => {
    const updateData: any = { updated_at: new Date().toISOString() };
    if (updates.title) updateData.title = updates.title;
    if (updates.content) updateData.content = updates.content;
    if (updates.orderIndex !== undefined)
      updateData.order_index = updates.orderIndex;
    if (updates.sectionId) updateData.section_id = updates.sectionId;

    const { data, error } = await supabase
      .from("rules")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      orderIndex: data.order_index,
      createdBy: data.created_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  deleteRule: async (id: string): Promise<void> => {
    const { error } = await supabase.from("rules").delete().eq("id", id);
    if (error) throw error;
  },
};

/* ---------- SECTIONS ---------- */
export const sectionsAPI = {
  getSections: async (): Promise<RuleSection[]> => {
    const { data: sections, error: sectionErr } = await supabase
      .from("rule_sections")
      .select("*")
      .order("order_index");

    if (sectionErr) throw sectionErr;

    const sectionsWithRules: RuleSection[] = await Promise.all(
      (sections || []).map(async (section) => {
        const { data: rules, error: rulesErr } = await supabase
          .from("rules")
          .select("*")
          .eq("section_id", section.id)
          .order("order_index");

        if (rulesErr) throw rulesErr;

        return {
          id: section.id,
          title: section.title,
          description: section.description ?? "",
          icon: section.icon ?? "",
          orderIndex: section.order_index ?? 0,
          rules: (rules || []).map((rule) => ({
            id: rule.id,
            title: rule.title,
            content: rule.content,
            orderIndex: rule.order_index,
            createdBy: rule.created_by,
            createdAt: rule.created_at,
            updatedAt: rule.updated_at,
          })),
        };
      })
    );

    return sectionsWithRules;
  },

  createSection: async (
    title: string,
    description?: string,
    icon?: string,
    index?: number
  ): Promise<RuleSection> => {
    const newId = uuidv4();

    const { error } = await supabase.from("rule_sections").insert([
      {
        id: newId,
        title,
        description: description ?? "",
        icon: icon ?? "",
        order_index: index ?? 0,
      },
    ]);

    if (error) throw error;

    return {
      id: newId,
      title,
      description: description ?? "",
      icon: icon ?? "",
      orderIndex: index ?? 0,
      rules: [],
    };
  },

  updateSection: async (
    id: string,
    updates: {
      title?: string;
      description?: string;
      icon?: string;
      orderIndex?: number;
    }
  ): Promise<RuleSection> => {
    const updateData: Record<string, any> = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined)
      updateData.description = updates.description;
    if (updates.icon !== undefined) updateData.icon = updates.icon;
    if (updates.orderIndex !== undefined)
      updateData.order_index = updates.orderIndex;

    if (Object.keys(updateData).length === 0) {
      throw new Error("Nessun campo da aggiornare");
    }

    const { data, error } = await supabase
      .from("rule_sections")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      icon: data.icon,
      orderIndex: data.order_index,
      rules: [],
    };
  },

  deleteSection: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("rule_sections")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  deleteAllSections: async () => {
    return fetch("/rule_sections", {
      method: "DELETE",
    });
  },
};

/* ---------- ADMIN ---------- */
export const adminAPI = {
  getStats: async (): Promise<{
    totalSections: number;
    totalRules: number;
  }> => {
    const { count: sectionCount, error: err1 } = await supabase
      .from("rule_sections")
      .select("*", { count: "exact", head: true });
    if (err1) throw err1;

    const { count: rulesCount, error: err2 } = await supabase
      .from("rules")
      .select("*", { count: "exact", head: true });
    if (err2) throw err2;

    return {
      totalSections: sectionCount ?? 0,
      totalRules: rulesCount ?? 0,
    };
  },
};

/* ---------- BACKUP ---------- */
export const backupAPI = {
  createBackup: async (
    name: string,
    type: "manual" | "auto",
    sections: RuleSection[]
  ) => {
    const backupId = uuidv4();

    const { error: metaError } = await supabase.from("backup_meta").insert([
      {
        id: backupId,
        name,
        type,
        status: "completed",
      },
    ]);
    if (metaError) throw metaError;

    const { error: dataError } = await supabase.from("backup_data").insert([
      {
        backup_id: backupId,
        data: sections,
      },
    ]);
    if (dataError) throw dataError;

    return { id: backupId };
  },

  listBackups: async () => {
    const { data, error } = await supabase
      .from("backup_meta")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { meta: data };
  },

  fetchBackupData: async (id: string): Promise<RuleSection[]> => {
    const { data, error } = await supabase
      .from("backup_data")
      .select("data")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data.data;
  },
};

export default {
  rulesAPI,
  sectionsAPI,
  adminAPI,
  backupAPI,
};
