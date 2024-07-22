export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      catalog: {
        Row: {
          artifact: string
          created_at: string
          description: string | null
          id: number
          public: boolean | null
          title: string | null
          user_id: string
        }
        Insert: {
          artifact?: string
          created_at?: string
          description?: string | null
          id?: number
          public?: boolean | null
          title?: string | null
          user_id?: string
        }
        Update: {
          artifact?: string
          created_at?: string
          description?: string | null
          id?: number
          public?: boolean | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      project: {
        Row: {
          created_at: string
          description: string | null
          detail: Database["public"]["Enums"]["details"] | null
          feature: Database["public"]["Enums"]["features"] | null
          files: string[] | null
          id: number
          model_urls: string[] | null
          name: string | null
          order: Database["public"]["Enums"]["orders"] | null
          process_end: string | null
          process_start: string | null
          status: Database["public"]["Enums"]["status"] | null
          telegram_user: number | null
          thumbnail: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          detail?: Database["public"]["Enums"]["details"] | null
          feature?: Database["public"]["Enums"]["features"] | null
          files?: string[] | null
          id?: number
          model_urls?: string[] | null
          name?: string | null
          order?: Database["public"]["Enums"]["orders"] | null
          process_end?: string | null
          process_start?: string | null
          status?: Database["public"]["Enums"]["status"] | null
          telegram_user?: number | null
          thumbnail?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          detail?: Database["public"]["Enums"]["details"] | null
          feature?: Database["public"]["Enums"]["features"] | null
          files?: string[] | null
          id?: number
          model_urls?: string[] | null
          name?: string | null
          order?: Database["public"]["Enums"]["orders"] | null
          process_end?: string | null
          process_start?: string | null
          status?: Database["public"]["Enums"]["status"] | null
          telegram_user?: number | null
          thumbnail?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_telegram_user"
            columns: ["telegram_user"]
            isOneToOne: false
            referencedRelation: "telegram_user"
            referencedColumns: ["id"]
          },
        ]
      }
      project_catalog: {
        Row: {
          catalog_id: number | null
          created_at: string
          id: number
          project_id: number | null
          user_id: string
        }
        Insert: {
          catalog_id?: number | null
          created_at?: string
          id?: number
          project_id?: number | null
          user_id?: string
        }
        Update: {
          catalog_id?: number | null
          created_at?: string
          id?: number
          project_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_catalog_catalog"
            columns: ["catalog_id"]
            isOneToOne: false
            referencedRelation: "catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_project_catalog_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_user: {
        Row: {
          created_at: string
          first_name: string | null
          id: number
          language_code: string | null
          type: string | null
          user_id: number | null
          username: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: number
          language_code?: string | null
          type?: string | null
          user_id?: number | null
          username?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: number
          language_code?: string | null
          type?: string | null
          user_id?: number | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      details: "preview" | "reduced" | "medium" | "full" | "raw"
      features: "normal" | "high"
      orders: "unordered" | "sequential"
      status: "error" | "in queue" | "processing" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
