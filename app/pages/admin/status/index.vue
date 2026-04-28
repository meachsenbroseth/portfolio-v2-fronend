<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Status</h1>
        <p class="text-sm text-muted-foreground">Manage your experience and education</p>
      </div>
      <div class="flex gap-3">
        <Button @click="openAddDialog('experience')">
          <Plus class="mr-2 h-4 w-4" />
          Add Experience
        </Button>
        <Button variant="outline" @click="openAddDialog('education')">
          <Plus class="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Experience</CardTitle>
          <Briefcase class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ experience.length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Education</CardTitle>
          <GraduationCap class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-green-600">{{ education.length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Current Role</CardTitle>
          <User class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-sm font-medium truncate">{{ currentRole }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Latest Education</CardTitle>
          <Calendar class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-sm font-medium truncate">{{ latestEducation }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Experience Section -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Briefcase class="h-5 w-5" />
          Experience
        </CardTitle>
        <CardDescription>Your professional work history</CardDescription>
      </CardHeader>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-20">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Date</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in experience" :key="item.id">
              <TableCell class="font-mono text-xs">{{ item.id }}</TableCell>
              <TableCell>
                <div>
                  <p class="font-medium">{{ item.title }}</p>
                  <p class="text-xs text-muted-foreground line-clamp-1">{{ item.desc }}</p>
                </div>
              </TableCell>
              <TableCell>{{ item.company }}</TableCell>
              <TableCell>{{ item.date }}</TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" @click="openEditDialog('experience', item)">
                    <Pencil class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="confirmDelete('experience', item)">
                    <Trash2 class="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="experience.length === 0">
              <TableCell colspan="6" class="text-center py-8 text-muted-foreground">
                No experience entries found. Click "Add Experience" to create one.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Education Section -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <GraduationCap class="h-5 w-5" />
          Education
        </CardTitle>
        <CardDescription>Your academic background and certifications</CardDescription>
      </CardHeader>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-20">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Date</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in education" :key="item.id">
              <TableCell class="font-mono text-xs">{{ item.id }}</TableCell>
              <TableCell>
                <div>
                  <p class="font-medium">{{ item.title }}</p>
                  <p class="text-xs text-muted-foreground line-clamp-1">{{ item.desc }}</p>
                </div>
              </TableCell>
              <TableCell>{{ item.institution }}</TableCell>
              <TableCell>{{ item.date }}</TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" @click="openEditDialog('education', item)">
                    <Pencil class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="confirmDelete('education', item)">
                    <Trash2 class="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="education.length === 0">
              <TableCell colspan="6" class="text-center py-8 text-muted-foreground">
                No education entries found. Click "Add Education" to create one.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Add/Edit Dialog -->
    <Dialog v-model:open="dialogOpen">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {{ dialogType === 'experience' ? (isEditing ? 'Edit Experience' : 'Add Experience') : (isEditing ? 'Edit Education' : 'Add Education') }}
          </DialogTitle>
          <DialogDescription>
            {{ dialogType === 'experience' ? 'Add or update your work experience.' : 'Add or update your education background.' }}
          </DialogDescription>
        </DialogHeader>

        <!-- Experience Form -->
        <form v-if="dialogType === 'experience'" @submit.prevent="saveExperience" class="space-y-4">
          <div class="space-y-2">
            <Label for="exp-title">Title *</Label>
            <Input id="exp-title" v-model="expForm.title" required />
          </div>

          <div class="space-y-2">
            <Label for="exp-company">Company *</Label>
            <Input id="exp-company" v-model="expForm.company" required />
          </div>

          <div class="space-y-2">
            <Label for="exp-date">Date *</Label>
            <Input id="exp-date" v-model="expForm.date" placeholder="2023 — 2024" required />
          </div>

          <div class="space-y-2">
            <Label for="exp-desc">Description *</Label>
            <Textarea id="exp-desc" v-model="expForm.desc" rows="4" required />
          </div>

          <div class="space-y-2">
            <Label>Technologies</Label>
            <div class="flex flex-wrap gap-2 mb-2">
              <Badge
                v-for="tag in expForm.tags"
                :key="tag"
                variant="secondary"
                class="cursor-pointer hover:bg-red-100"
                @click="removeExpTag(tag)"
              >
                {{ tag }}
                <X class="ml-1 h-3 w-3" />
              </Badge>
            </div>
            <div class="flex gap-2">
              <Input v-model="newTag" placeholder="Add technology" @keyup.enter="addExpTag" />
              <Button type="button" variant="outline" @click="addExpTag">Add</Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" @click="dialogOpen = false">Cancel</Button>
            <Button type="submit">{{ isEditing ? 'Update' : 'Create' }}</Button>
          </DialogFooter>
        </form>

        <!-- Education Form -->
        <form v-else @submit.prevent="saveEducation" class="space-y-4">
          <div class="space-y-2">
            <Label for="edu-title">Title *</Label>
            <Input id="edu-title" v-model="eduForm.title" required />
          </div>

          <div class="space-y-2">
            <Label for="edu-institution">Institution *</Label>
            <Input id="edu-institution" v-model="eduForm.institution" required />
          </div>

          <div class="space-y-2">
            <Label for="edu-date">Date *</Label>
            <Input id="edu-date" v-model="eduForm.date" placeholder="2020 — 2024" required />
          </div>

          <div class="space-y-2">
            <Label for="edu-desc">Description *</Label>
            <Textarea id="edu-desc" v-model="eduForm.desc" rows="4" required />
          </div>

          <div class="space-y-2">
            <Label>Focus Areas</Label>
            <div class="flex flex-wrap gap-2 mb-2">
              <Badge
                v-for="focus in eduForm.focus"
                :key="focus"
                variant="secondary"
                class="cursor-pointer hover:bg-red-100"
                @click="removeEduFocus(focus)"
              >
                {{ focus }}
                <X class="ml-1 h-3 w-3" />
              </Badge>
            </div>
            <div class="flex gap-2">
              <Input v-model="newFocus" placeholder="Add focus area" @keyup.enter="addEduFocus" />
              <Button type="button" variant="outline" @click="addEduFocus">Add</Button>
            </div>
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
            This action cannot be undone. This will permanently delete this
            {{ deleteType === 'experience' ? 'experience' : 'education' }} entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="deleteEntry" class="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Briefcase,
  GraduationCap,
  User,
  Calendar
} from "lucide-vue-next"

definePageMeta({
  layout: 'admin-layout'
})

// Data
const experience = ref([
  {
    id: 1,
    title: 'Full-Stack Developer',
    company: 'Phanna Computer',
    date: '2025 — PRESENT',
    desc: 'Architecting a comprehensive e-commerce and inventory management system using the TALL stack. Implementing ABA PayWay and KHQR payment integrations.',
  },
  {
    id: 2,
    title: 'Web Developer (Freelance)',
    company: 'Self-Employed',
    date: '2023 — 2024',
    desc: 'Developed custom Portfolio CMS solutions and business landing pages with Nuxt 3 and Tailwind CSS. Focused on SEO and performance optimization.',
  }
])

const education = ref([
  {
    id: 1,
    title: 'Computer Science & Engineering',
    date: '2020 — 2024',
    desc: 'Deep focus on MVC architecture, database normalization, and secure API design. Final projects specialized in management system automation.',
    institution: 'University',

  },
  {
    id: 2,
    title: 'Full-Stack Certification',
    date: '2022',
    desc: 'Advanced training in modern JavaScript frameworks and backend PHP ecosystems (Laravel/Filament).',
    institution: 'Institute',
  }
])

// UI State
const dialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const isEditing = ref(false)
const dialogType = ref('experience') // 'experience' or 'education'
const deleteType = ref('experience')
const deleteItem = ref(null)
const newTag = ref('')
const newFocus = ref('')

// Experience Form
const expForm = ref({
  id: null,
  title: '',
  company: '',
  date: '',
  desc: '',
  tags: []
})

// Education Form
const eduForm = ref({
  id: null,
  title: '',
  institution: '',
  date: '',
  desc: '',
  focus: []
})

// Computed
const currentRole = computed(() => {
  const current = experience.value.find(exp => exp.date.includes('PRESENT'))
  return current ? current.title : 'Not specified'
})

const latestEducation = computed(() => {
  if (education.value.length === 0) return 'Not specified'
  return education.value[0].title
})

// Experience Methods
const addExpTag = () => {
  if (newTag.value.trim() && !expForm.value.tags.includes(newTag.value.trim())) {
    expForm.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeExpTag = (tag) => {
  expForm.value.tags = expForm.value.tags.filter(t => t !== tag)
}

const saveExperience = () => {
  if (isEditing.value) {
    const index = experience.value.findIndex(e => e.id === expForm.value.id)
    if (index !== -1) {
      experience.value[index] = { ...expForm.value }
    }
  } else {
    const newId = Math.max(...experience.value.map(e => e.id), 0) + 1
    experience.value.push({
      ...expForm.value,
      id: newId
    })
  }
  dialogOpen.value = false
  resetForms()
}

// Education Methods
const addEduFocus = () => {
  if (newFocus.value.trim() && !eduForm.value.focus.includes(newFocus.value.trim())) {
    eduForm.value.focus.push(newFocus.value.trim())
    newFocus.value = ''
  }
}

const removeEduFocus = (focus) => {
  eduForm.value.focus = eduForm.value.focus.filter(f => f !== focus)
}

const saveEducation = () => {
  if (isEditing.value) {
    const index = education.value.findIndex(e => e.id === eduForm.value.id)
    if (index !== -1) {
      education.value[index] = { ...eduForm.value }
    }
  } else {
    const newId = Math.max(...education.value.map(e => e.id), 0) + 1
    education.value.push({
      ...eduForm.value,
      id: newId
    })
  }
  dialogOpen.value = false
  resetForms()
}

// Common Methods
const openAddDialog = (type) => {
  dialogType.value = type
  isEditing.value = false
  resetForms()
  dialogOpen.value = true
}

const openEditDialog = (type, item) => {
  dialogType.value = type
  isEditing.value = true
  
  if (type === 'experience') {
    expForm.value = { ...item }
  } else {
    eduForm.value = { ...item }
  }
  
  dialogOpen.value = true
}

const confirmDelete = (type, item) => {
  deleteType.value = type
  deleteItem.value = item
  deleteDialogOpen.value = true
}

const deleteEntry = () => {
  if (deleteType.value === 'experience') {
    const index = experience.value.findIndex(e => e.id === deleteItem.value.id)
    if (index !== -1) {
      experience.value.splice(index, 1)
    }
  } else {
    const index = education.value.findIndex(e => e.id === deleteItem.value.id)
    if (index !== -1) {
      education.value.splice(index, 1)
    }
  }
  deleteDialogOpen.value = false
  deleteItem.value = null
}

const resetForms = () => {
  expForm.value = {
    id: null,
    title: '',
    company: '',
    date: '',
    desc: '',
    tags: []
  }
  eduForm.value = {
    id: null,
    title: '',
    institution: '',
    date: '',
    desc: '',
    focus: []
  }
  newTag.value = ''
  newFocus.value = ''
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>