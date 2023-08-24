export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          created_at: string
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      levels: {
        Row: {
          created_at: string
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      worker_notes: {
        Row: {
          created_at: string | null
          id: string
          note: string | null
          sentiment: number | null
          updated_at: string | null
          worker_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          note?: string | null
          sentiment?: number | null
          updated_at?: string | null
          worker_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          note?: string | null
          sentiment?: number | null
          updated_at?: string | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_notes_worker_id_fkey"
            columns: ["worker_id"]
            referencedRelation: "workers"
            referencedColumns: ["id"]
          }
        ]
      }
      workers: {
        Row: {
          created_at: string | null
          department_id: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          level_id: string | null
          manager_id: string | null
          profile_pic: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_id?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          level_id?: string | null
          manager_id?: string | null
          profile_pic?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          level_id?: string | null
          manager_id?: string | null
          profile_pic?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workers_department_id_fkey"
            columns: ["department_id"]
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workers_level_id_fkey"
            columns: ["level_id"]
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workers_manager_id_fkey"
            columns: ["manager_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
