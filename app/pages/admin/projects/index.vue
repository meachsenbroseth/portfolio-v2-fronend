<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Projects</h1>
        <p class="text-sm text-muted-foreground">Manage your portfolio projects</p>
      </div>
      <Button @click="openAddDialog">
        <Plus class="mr-2 h-4 w-4" />
        Add New Project
      </Button>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Projects</CardTitle>
          <Folder class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ projects.length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Published</CardTitle>
          <BadgeCheck class="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-green-600">{{ publishedCount }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">In Progress</CardTitle>
          <Activity class="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-yellow-600">{{ inProgressCount }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Technologies</CardTitle>
          <Code2 class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ uniqueTechCount }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          v-model="searchQuery"
          placeholder="Search projects..."
          class="pl-9"
        />
      </div>
      <Select v-model="statusFilter">
        <SelectTrigger class="w-45">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" @click="clearFilters">
        <X class="mr-2 h-4 w-4" />
        Clear
      </Button>
    </div>

    <!-- Projects Table -->
    <Card>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-20">ID</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="project in filteredProjects" :key="project.id">
              <TableCell class="font-mono text-xs">{{ project.id }}</TableCell>
              <TableCell>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded overflow-hidden bg-gray-100">
                    <img :src="project.image" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="font-medium">{{ project.title }}</p>
                    <p class="text-xs text-muted-foreground">{{ project.slug }}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{{ project.category }}</Badge>
              </TableCell>
              <TableCell>
                <Badge :variant="project.status === 'completed' ? 'default' : 'outline'">
                  {{ project.status === 'completed' ? 'Completed' : 'In Progress' }}
                </Badge>
              </TableCell>
              <TableCell>{{ project.date }}</TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" @click="openEditDialog(project)">
                    <Pencil class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="confirmDelete(project)">
                    <Trash2 class="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="filteredProjects.length === 0">
              <TableCell colspan="6" class="text-center py-8 text-muted-foreground">
                No projects found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Add/Edit Dialog -->
    <Dialog v-model:open="dialogOpen">
      <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Edit Project' : 'Add New Project' }}</DialogTitle>
          <DialogDescription>
            {{ isEditing ? 'Update project details below.' : 'Fill in the project details below.' }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="saveProject" class="space-y-4">
          <!-- Title -->
          <div class="space-y-2">
            <Label for="title">Title *</Label>
            <Input id="title" v-model="formData.title" required />
          </div>

          <!-- Slug -->
          <div class="space-y-2">
            <Label for="slug">Slug *</Label>
            <Input id="slug" v-model="formData.slug" required />
          </div>

          <!-- Category & Date -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="category">Category *</Label>
              <Input id="category" v-model="formData.category" required />
            </div>
            <div class="space-y-2">
              <Label for="date">Date *</Label>
              <Input id="date" v-model="formData.date" placeholder="2024" required />
            </div>
          </div>

          <!-- Status -->
          <div class="space-y-2">
            <Label for="status">Status</Label>
            <Select v-model="formData.status">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea id="description" v-model="formData.description" rows="4" />
          </div>

          <!-- Image URL -->
          <div class="space-y-2">
            <Label for="image">Image URL</Label>
            <Input id="image" v-model="formData.image" />
          </div>

          <!-- Technologies -->
          <div class="space-y-2">
            <Label>Technologies</Label>
            <div class="flex flex-wrap gap-2 mb-2">
              <Badge
                v-for="tech in formData.technologies"
                :key="tech"
                variant="secondary"
                class="cursor-pointer hover:bg-red-100"
                @click="removeTech(tech)"
              >
                {{ tech }}
                <X class="ml-1 h-3 w-3" />
              </Badge>
            </div>
            <div class="flex gap-2">
              <Input v-model="newTech" placeholder="Add technology" @keyup.enter="addTech" />
              <Button type="button" variant="outline" @click="addTech">Add</Button>
            </div>
          </div>

          <!-- Live URL -->
          <div class="space-y-2">
            <Label for="live">Live Demo URL</Label>
            <Input id="live" v-model="formData.live" placeholder="https://..." />
          </div>

          <!-- GitHub URL -->
          <div class="space-y-2">
            <Label for="github">GitHub URL</Label>
            <Input id="github" v-model="formData.github" placeholder="https://github.com/..." />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" @click="dialogOpen = false">Cancel</Button>
            <Button type="submit">{{ isEditing ? 'Update' : 'Create' }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the project
            "{{ projectToDelete?.title }}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="deleteProject" class="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Icons
import {
Plus,
Folder,
BadgeCheck,
Activity,
Code2,
Search,
X,
Pencil,
Trash2
} from "lucide-vue-next"

definePageMeta({
  layout: 'admin-layout'
})

// Dummy data
const projects = ref([
  {
    id: 1,
    slug: 'phanna-erp',
    title: 'Phanna Computer ERP',
    category: 'Enterprise System',
    date: '2025',
    status: 'in_progress',
    description: 'Comprehensive e-commerce and inventory management system with ABA PayWay and KHQR payment integrations.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=150&fit=crop',
    technologies: ['Laravel', 'Filament', 'Livewire', 'PostgreSQL'],
    live: null,
    github: 'https://github.com'
  },
  {
    id: 2,
    slug: 'portfolio-cms',
    title: 'Portfolio CMS',
    category: 'Web App',
    date: '2024',
    status: 'completed',
    description: 'Custom CMS with headless architecture and a Nuxt 3 frontend.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&h=150&fit=crop',
    technologies: ['Nuxt 3', 'Vue.js', 'TailwindCSS'],
    live: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: 3,
    slug: 'khqr-dashboard',
    title: 'KHQR Dashboard',
    category: 'Fintech',
    date: '2024',
    status: 'completed',
    description: 'Real-time payment monitoring for KHQR transactions.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=150&fit=crop',
    technologies: ['Nuxt 3', 'Laravel', 'WebSockets'],
    live: null,
    github: 'https://github.com'
  }
])

// UI State
const searchQuery = ref('')
const statusFilter = ref('all')
const dialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const isEditing = ref(false)
const projectToDelete = ref(null)
const newTech = ref('')

// Form Data
const formData = ref({
  id: null,
  slug: '',
  title: '',
  category: '',
  date: '',
  status: 'completed',
  description: '',
  image: '',
  technologies: [],
  live: '',
  github: ''
})

// Computed
const publishedCount = computed(() => projects.value.filter(p => p.status === 'completed').length)
const inProgressCount = computed(() => projects.value.filter(p => p.status === 'in_progress').length)
const uniqueTechCount = computed(() => {
  const techs = new Set()
  projects.value.forEach(p => p.technologies.forEach(t => techs.add(t)))
  return techs.size
})

const filteredProjects = computed(() => {
  let filtered = [...projects.value]
  
  if (searchQuery.value) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(p => p.status === statusFilter.value)
  }
  
  return filtered
})

// Methods
const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
}

const openAddDialog = () => {
  isEditing.value = false
  formData.value = {
    id: null,
    slug: '',
    title: '',
    category: '',
    date: new Date().getFullYear().toString(),
    status: 'completed',
    description: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=150&fit=crop',
    technologies: [],
    live: '',
    github: ''
  }
  dialogOpen.value = true
}

const openEditDialog = (project) => {
  isEditing.value = true
  formData.value = { ...project }
  dialogOpen.value = true
}

const addTech = () => {
  if (newTech.value.trim() && !formData.value.technologies.includes(newTech.value.trim())) {
    formData.value.technologies.push(newTech.value.trim())
    newTech.value = ''
  }
}

const removeTech = (tech) => {
  formData.value.technologies = formData.value.technologies.filter(t => t !== tech)
}

const saveProject = () => {
  if (isEditing.value) {
    const index = projects.value.findIndex(p => p.id === formData.value.id)
    if (index !== -1) {
      projects.value[index] = { ...formData.value }
    }
  } else {
    const newId = Math.max(...projects.value.map(p => p.id), 0) + 1
    projects.value.push({
      ...formData.value,
      id: newId
    })
  }
  dialogOpen.value = false
}

const confirmDelete = (project) => {
  projectToDelete.value = project
  deleteDialogOpen.value = true
}

const deleteProject = () => {
  const index = projects.value.findIndex(p => p.id === projectToDelete.value.id)
  if (index !== -1) {
    projects.value.splice(index, 1)
  }
  deleteDialogOpen.value = false
  projectToDelete.value = null
}
</script>
can u make separate page for add edit