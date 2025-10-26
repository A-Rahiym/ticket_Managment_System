<template>
  <!-- Desktop Table Row -->
  <tr
    class="hidden md:table-row border-b border-border/30 transition-colors"
    :class="isRowSelected ? 'bg-primary/10' : 'hover:bg-muted/50'"
    @click="onRowClick?.()"
  >
    <td class="p-4">
      <input
        type="checkbox"
        :checked="isSelected"
        @change.stop="onToggleSelection?.()"
        aria-label="Select ticket"
        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
      />
    </td>

    <td class="p-4">
      <div>
        <p class="font-medium">{{ ticket?.title }}</p>
        <p
          v-if="ticket?.description"
          class="text-sm text-muted-foreground line-clamp-1 mt-1"
        >
          {{ ticket?.description }}
        </p>
      </div>
    </td>

    <td class="p-4 flex items-center gap-2">
      <div
        class="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary text-xs"
      >
        {{ getInitials(ticket?.assignee) }}
      </div>
      <span class="text-sm">{{ ticket?.assignee }}</span>
    </td>

    <td class="p-4">
      <Badge
        v-if="ticket?.status === 'open'"
        className="rounded-full bg-green-100 text-green-700 border-green-200 hover:bg-green-100"
      >
        Open
      </Badge>
      <Badge
        v-else-if="ticket?.status === 'in_progress'"
        className="rounded-full bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
      >
        In Progress
      </Badge>
      <Badge
        v-else-if="ticket?.status === 'closed'"
        className="rounded-full bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100"
      >
        Resolved
      </Badge>
    </td>

    <td class="p-4">
      <Badge
        v-if="ticket?.priority === 'high'"
        variant="outline"
        className="rounded-full border-red-300 text-red-700 bg-red-50"
      >
        High
      </Badge>
      <Badge
        v-else-if="ticket?.priority === 'medium'"
        variant="outline"
        className="rounded-full border-primary/30 text-primary bg-primary/5"
      >
        Medium
      </Badge>
      <Badge
        v-else-if="ticket?.priority === 'low'"
        variant="outline"
        className="rounded-full border-blue-300 text-blue-700 bg-blue-50"
      >
        Low
      </Badge>
    </td>

    <td class="p-4 text-sm text-muted-foreground">
      {{ ticket?.createdAt ? new Date(ticket?.createdAt).toLocaleDateString() : "—" }}
    </td>

    <td class="p-4">
      <div class="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 rounded-xl gradient-purple-pink border-2 border-[hsl(var(--neon-green))] shadow-md shadow-[hsl(var(--neon-green))]/20"
          @click.stop="onEdit?.()"
        >
          <Edit2 class="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          class="h-8 w-8 rounded-xl border-2 border-red-500 shadow-md shadow-red-500/20"
          @click.stop="onDelete?.()"
        >
          <Trash2 class="h-4 w-4" />
        </Button>
      </div>
    </td>
  </tr>

  <!-- Mobile Card -->
  <div
    class="block md:hidden border border-border/50 rounded-lg shadow-sm bg-card p-4 mb-4 transition-colors animate-in fade-in"
    :class="isRowSelected ? 'bg-primary/10' : 'hover:bg-muted/50'"
    @click="onRowClick?.()"
  >
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            class="h-7 w-7 rounded-lg gradient-purple-pink border-2 border-[hsl(var(--neon-green))] shadow-md shadow-[hsl(var(--neon-green))]/20"
            @click.stop="onEdit?.()"
          >
            <Edit2 class="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            class="h-7 w-7 rounded-lg border-2 border-red-500 shadow-md shadow-red-500/20"
            @click.stop="onDelete?.()"
          >
            <Trash2 class="h-3 w-3" />
          </Button>
        </div>
      </div>

      <p class="font-medium text-sm">{{ ticket?.title }}</p>
      <p
        v-if="ticket?.description"
        class="text-xs text-muted-foreground line-clamp-2 mt-1"
      >
        {{ ticket?.description }}
      </p>

      <div class="flex items-center gap-2">
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center bg-primary/10 text-primary text-xs"
        >
          {{ getInitials(ticket?.assignee) }}
        </div>
        <span class="text-xs">{{ ticket?.assignee }}</span>
      </div>

      <div class="flex gap-2">
        <Badge
          v-if="ticket?.status === 'open'"
          className="rounded-full bg-green-100 text-green-700 border-green-200 hover:bg-green-100"
        >
          Open
        </Badge>
        <Badge
          v-else-if="ticket?.status === 'in_progress'"
          className="rounded-full bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
        >
          In Progress
        </Badge>
        <Badge
          v-else-if="ticket?.status === 'closed'"
          className="rounded-full bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100"
        >
          Resolved
        </Badge>

        <Badge
          v-if="ticket?.priority === 'high'"
          variant="outline"
          className="rounded-full border-red-300 text-red-700 bg-red-50"
        >
          High
        </Badge>
        <Badge
          v-else-if="ticket?.priority === 'medium'"
          variant="outline"
          className="rounded-full border-primary/30 text-primary bg-primary/5"
        >
          Medium
        </Badge>
        <Badge
          v-else-if="ticket?.priority === 'low'"
          variant="outline"
          className="rounded-full border-blue-300 text-blue-700 bg-blue-50"
        >
          Low
        </Badge>
      </div>

      <p class="text-xs text-muted-foreground">
        Created: {{ ticket?.createdAt ? new Date(ticket?.createdAt).toLocaleDateString() : "—" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit2, Trash2 } from "lucide-vue-next";
import Button from "@/components/ui/Button.vue";
import Badge from "@/components/ui/Badge.vue";

// 🧠 Use proper function types (no TS warnings anymore)
interface Ticket {
  id?: string;
  title?: string;
  description?: string;
  assignee?: string;
  status?: string;
  priority?: string;
  createdAt?: string;
}

const props = defineProps<{
  ticket?: Ticket;
  isSelected?: boolean;
  isRowSelected?: boolean;
  onToggleSelection?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onRowClick?: () => void;
}>();

const getInitials = (name?: string) =>
  name
    ?.split(" ")
    .map((n) => n?.[0])
    .join("")
    ?.toUpperCase()
    ?.slice(0, 2) || "";
</script>
