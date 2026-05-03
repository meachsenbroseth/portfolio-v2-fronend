<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Projects</h1>
        <p class="text-sm text-muted-foreground">Manage your portfolio projects</p>
      </div>
      <Button @click="openAddDialog">
        <Plus class="mr-2 h-4 w-4" />
        Add New Project
      </Button>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
    </div>

    <div v-else>
      <div class="mb-6 flex flex-col gap-4 sm:flex-row">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input v-model="searchQuery" placeholder="Search projects..." class="pl-9" />
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

      <Card>
        <CardContent class="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-20">ID</TableHead>
                <TableHead>Project</TableHead>
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
                    <div class="h-10 w-10 overflow-hidden rounded bg-gray-100">
                      <img :src="project.image || placeholderImage" class="h-full w-full object-cover"
                        @error="handleImageError" />
                    </div>
                    <div>
                      <p class="font-medium">{{ project.title }}</p>
                      <p class="text-xs text-muted-foreground">{{ project.slug }}</p>
                    </div>
                  </div>
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
                <TableCell colspan="5" class="py-8 text-center text-muted-foreground">
                  No projects found
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

    <Dialog v-model:open="dialogOpen">
      <DialogContent class="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Edit Project' : 'Add New Project' }}</DialogTitle>
          <DialogDescription>
            {{ isEditing ? 'Update project details below.' : 'Fill in the project details below.' }}
          </DialogDescription>
        </DialogHeader>

        <div v-if="error || validationErrorMessages.length" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p v-if="error" class="font-medium">{{ error }}</p>
          <ul v-if="validationErrorMessages.length" class="mt-1 list-inside list-disc space-y-1">
            <li v-for="message in validationErrorMessages" :key="message">{{ message }}</li>
          </ul>
        </div>

        <form class="space-y-4" enctype="multipart/form-data" @submit.prevent="saveProject">
          <div class="space-y-2">
            <Label for="title">Title *</Label>
            <Input id="title" v-model="form.title" required placeholder="My Awesome Project" />
            <p class="text-xs text-muted-foreground">
              Slug is generated automatically by the API.
            </p>
          </div>

          <div class="space-y-2">
            <Label for="date">Date *</Label>
            <Input id="date" v-model="form.date" required placeholder="2024-01-15" type="date" />
          </div>

          <div class="space-y-2">
            <Label for="status">Status</Label>
            <Select v-model="form.status">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="desc">Desc</Label>
            <Textarea id="desc" v-model="form.desc" rows="4" placeholder="Project desc..." />
          </div>

          <div class="space-y-2">
            <Label>Main Image</Label>
            <div
              class="rounded-lg border-2 border-dashed border-gray-200 p-4 text-center transition-colors hover:border-gray-300">
              <input ref="mainImageInput" type="file" accept="image/*" class="hidden" @change="handleMainImageUpload" />
              <div v-if="form.imagePreview" class="relative inline-block">
                <img :src="form.imagePreview" class="h-32 w-32 rounded-lg object-cover" />
                <button type="button"
                  class="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  @click="removeMainImage">
                  <X class="h-3 w-3" />
                </button>
              </div>
              <div v-else class="cursor-pointer" @click="mainImageInput?.click()">
                <Upload class="mx-auto mb-2 h-8 w-8 text-gray-400" />
                <p class="text-sm text-gray-500">Click to upload main image</p>
                <p class="text-xs text-gray-400">PNG, JPG, WEBP up to 2MB</p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <Label>Gallery Images</Label>
            <div class="rounded-lg border-2 border-dashed border-gray-200 p-4">
              <input ref="galleryInput" type="file" accept="image/*" multiple class="hidden"
                @change="handleGalleryUpload" />

              <div v-if="form.galleryItems.length" class="mb-4 grid grid-cols-4 gap-3">
                <div v-for="(item, index) in form.galleryItems" :key="item.key" class="group relative">
                  <img :src="item.preview" class="h-20 w-full rounded-lg border object-cover" />
                  <button type="button"
                    class="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    @click="removeGalleryImage(index)">
                    <X class="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div class="cursor-pointer text-center" @click="galleryInput?.click()">
                <Images class="mx-auto mb-2 h-8 w-8 text-gray-400" />
                <p class="text-sm text-gray-500">Click to upload gallery images</p>
                <p class="text-xs text-gray-400">Multiple images supported (max 10, up to 2MB each)</p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <Label>Technologies</Label>
            <div class="mb-2 flex flex-wrap gap-2">
              <Badge v-for="tech in form.technologies" :key="tech" variant="secondary"
                class="cursor-pointer hover:bg-red-100" @click="removeTech(tech)">
                {{ tech }}
                <X class="ml-1 h-3 w-3" />
              </Badge>
            </div>
            <div class="flex gap-2">
              <Input v-model="newTech" placeholder="Add technology" @keyup.enter.prevent="addTech" />
              <Button type="button" variant="outline" @click="addTech">Add</Button>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="live_demo">Live Demo URL</Label>
            <Input id="live_demo" v-model="form.live_demo" placeholder="https://example.com" />
          </div>

          <div class="space-y-2">
            <Label for="github_link">GitHub URL</Label>
            <Input id="github_link" v-model="form.github_link" placeholder="https://github.com/username/repo" />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" @click="dialogOpen = false">Cancel</Button>
            <Button type="submit" :disabled="loading">
              {{ loading ? 'Saving...' : isEditing ? 'Update' : 'Create' }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

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
          <AlertDialogAction class="bg-red-600 hover:bg-red-700" @click="deleteProject">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Images, Pencil, Plus, Search, Trash2, Upload, X } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin-layout',
  middleware: 'auth',
})

const authStore = useAuthStore()
const projectStore = useProjectStore()
const { projects, loading, error, validationErrors } = storeToRefs(projectStore)

const placeholderImage = 'https://blocks.astratic.com/img/general-img-portrait.png'
const maxGalleryImages = 10

const searchQuery = ref('')
const statusFilter = ref('all')
const dialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const isEditing = ref(false)
const projectToDelete = ref(null)
const newTech = ref('')
const mainImageInput = ref(null)
const galleryInput = ref(null)

const createEmptyForm = () => ({
  id: null,
  title: '',
  date: new Date().toISOString().slice(0, 10),
  status: 'in_progress',
  desc: '',
  image: null,
  imagePreview: '',
  galleryItems: [],
  technologies: [],
  live_demo: '',
  github_link: '',
})

const form = ref(createEmptyForm())

const filteredProjects = computed(() => {
  let filtered = [...projects.value]
  const query = searchQuery.value.trim().toLowerCase()

  if (query) {
    filtered = filtered.filter((project) =>
      [project.title, project.desc]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((project) => project.status === statusFilter.value)
  }

  return filtered
})

const validationErrorMessages = computed(() =>
  Object.values(validationErrors.value || {}).flat()
)

const clearFileInput = (inputRef) => {
  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

const fileToGalleryItem = (file) => ({
  key: `new-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`}`,
  type: 'new',
  file,
  preview: URL.createObjectURL(file),
})

const handleMainImageUpload = (event) => {
  const [file] = event.target.files || []

  if (!file) return

  if (form.value.imagePreview?.startsWith('blob:')) {
    URL.revokeObjectURL(form.value.imagePreview)
  }

  form.value.image = file
  form.value.imagePreview = URL.createObjectURL(file)
}

const handleGalleryUpload = (event) => {
  const files = Array.from(event.target.files || [])
  const availableSlots = maxGalleryImages - form.value.galleryItems.length

  if (availableSlots <= 0) {
    alert(`Maximum ${maxGalleryImages} images allowed`)
    clearFileInput(galleryInput)
    return
  }

  files.slice(0, availableSlots).forEach((file) => {
    form.value.galleryItems.push(fileToGalleryItem(file))
  })

  if (files.length > availableSlots) {
    alert(`Only ${availableSlots} more gallery image(s) can be added`)
  }

  clearFileInput(galleryInput)
}

const removeMainImage = () => {
  if (form.value.imagePreview?.startsWith('blob:')) {
    URL.revokeObjectURL(form.value.imagePreview)
  }

  form.value.image = null
  form.value.imagePreview = ''
  clearFileInput(mainImageInput)
}

const removeGalleryImage = (index) => {
  const [removed] = form.value.galleryItems.splice(index, 1)

  if (removed?.type === 'new') {
    URL.revokeObjectURL(removed.preview)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
}

const resetForm = () => {
  if (form.value.imagePreview?.startsWith('blob:')) {
    URL.revokeObjectURL(form.value.imagePreview)
  }

  form.value.galleryItems
    .filter((item) => item.type === 'new')
    .forEach((item) => URL.revokeObjectURL(item.preview))

  form.value = createEmptyForm()
  newTech.value = ''
  projectStore.error = null
  projectStore.validationErrors = null
  clearFileInput(mainImageInput)
  clearFileInput(galleryInput)
}

const openAddDialog = () => {
  resetForm()
  isEditing.value = false
  dialogOpen.value = true
}

const openEditDialog = (project) => {
  resetForm()
  isEditing.value = true

  form.value = {
    id: project.id,
    title: project.title || '',
    date: project.date || '',
    status: project.status || 'in_progress',
    desc: project.desc || '',
    image: null,
    imagePreview: project.image || '',
    galleryItems: (project.raw_gallery || []).map((path, index) => ({
      key: `existing-${path}-${index}`,
      type: 'existing',
      path,
      preview: project.gallery?.[index] || projectStore.getFullImageUrl(path),
    })),
    technologies: [...(project.technologies || [])],
    live_demo: project.live_demo || '',
    github_link: project.github_link || '',
  }

  dialogOpen.value = true
}

const addTech = () => {
  const tech = newTech.value.trim()

  if (tech && !form.value.technologies.includes(tech)) {
    form.value.technologies.push(tech)
  }

  newTech.value = ''
}

const removeTech = (tech) => {
  form.value.technologies = form.value.technologies.filter((item) => item !== tech)
}

const buildProjectPayload = () => ({
  title: form.value.title,
  date: form.value.date,
  status: form.value.status,
  desc: form.value.desc,
  image: form.value.image,
  gallery: form.value.galleryItems
    .filter((item) => item.type === 'new')
    .map((item) => item.file),
  technologies: form.value.technologies,
  live_demo: form.value.live_demo,
  github_link: form.value.github_link,
})

const saveProject = async () => {
  try {
    const projectPayload = buildProjectPayload()

    if (isEditing.value) {
      await projectStore.updateProject(form.value.id, projectPayload)
    } else {
      await projectStore.createProject(projectPayload)
    }

    await projectStore.fetchProjects()
    dialogOpen.value = false
    resetForm()
  } catch (error) {
    console.error('Failed to save project:', error)
  }
}

const confirmDelete = (project) => {
  projectToDelete.value = project
  deleteDialogOpen.value = true
}

const deleteProject = async () => {
  if (!projectToDelete.value) return

  try {
    await projectStore.deleteProject(projectToDelete.value.id)
    await projectStore.fetchProjects()
    deleteDialogOpen.value = false
    projectToDelete.value = null
  } catch (error) {
    console.error('Failed to delete project:', error)
  }
}

const handleImageError = (event) => {
  event.target.src = placeholderImage
}

onMounted(async () => {
  if (!authStore.initialized) {
    await authStore.initAuth()
  }

  await projectStore.fetchProjects()
})
</script>
