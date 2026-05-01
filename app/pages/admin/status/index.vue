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

    <!-- Loading State -->
    <div v-if="experienceStore.loading || educationStore.loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <div v-else>
      <!-- Experience Section -->
      <Card class="mb-6">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Briefcase class="h-5 w-5" />
            Experience
          </CardTitle>
          <CardDescription>Your professional work history ({{ experienceStore.experiences?.length || 0 }} entries)</CardDescription>
        </CardHeader>
        <CardContent class="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-20">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in experienceStore.experiences" :key="item.id">
                <TableCell class="font-mono text-xs">{{ item.id }}</TableCell>
                <TableCell>
                  <div>
                    <p class="font-medium">{{ item.title }}</p>
                    <p class="text-xs text-muted-foreground line-clamp-1">{{ item.desc }}</p>
                  </div>
                </TableCell>
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
              <TableRow v-if="!experienceStore.experiences?.length">
                <TableCell colspan="4" class="text-center py-8 text-muted-foreground">
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
          <CardDescription>Your academic background and certifications ({{ educationStore.educations?.length || 0 }} entries)</CardDescription>
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
              <TableRow v-for="item in educationStore.educations" :key="item.id">
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
              <TableRow v-if="!educationStore.educations?.length">
                <TableCell colspan="5" class="text-center py-8 text-muted-foreground">
                  No education entries found. Click "Add Education" to create one.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

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
            <Label for="exp-date">Date *</Label>
            <Input id="exp-date" v-model="expForm.date" placeholder="2023 — 2024" required />
          </div>

          <div class="space-y-2">
            <Label for="exp-desc">Description *</Label>
            <Textarea id="exp-desc" v-model="expForm.desc" rows="4" required />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" @click="dialogOpen = false">Cancel</Button>
            <Button type="submit" :disabled="experienceStore.loading">
              {{ experienceStore.loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
            </Button>
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

          <DialogFooter>
            <Button variant="outline" type="button" @click="dialogOpen = false">Cancel</Button>
            <Button type="submit" :disabled="educationStore.loading">
              {{ educationStore.loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
            </Button>
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
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'admin-layout',
  middleware: 'auth'
})

const authStore = useAuthStore()
const experienceStore = useExperienceStore()
const educationStore = useEducationStore()

const { experiences, loading: expLoading } = storeToRefs(experienceStore)
const { educations, loading: eduLoading } = storeToRefs(educationStore)

// UI State
const dialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const isEditing = ref(false)
const dialogType = ref('experience')
const deleteType = ref('experience')
const deleteItem = ref(null)

// Forms
const expForm = ref({
  id: null,
  title: '',
  date: '',
  desc: ''
})

const eduForm = ref({
  id: null,
  title: '',
  institution: '',
  date: '',
  desc: ''
})

// Load data
const loadData = async () => {
  try {
    // Ensure auth is initialized first
    if (!authStore.initialized) {
      await authStore.initAuth()
    }
    
    // Only fetch if authenticated
    if (authStore.isAuthenticated) {
      await Promise.all([
        experienceStore.fetchExperiences(),
        educationStore.fetchEducations()
      ])
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

// Save functions
const saveExperience = async () => {
  try {
    if (isEditing.value) {
      await experienceStore.updateExperience(expForm.value.id, expForm.value)
    } else {
      await experienceStore.createExperience(expForm.value)
    }
    dialogOpen.value = false
    resetForms()
    await experienceStore.fetchExperiences()
  } catch (error) {
    console.error('Failed to save experience:', error)
  }
}

const saveEducation = async () => {
  try {
    if (isEditing.value) {
      await educationStore.updateEducation(eduForm.value.id, eduForm.value)
    } else {
      await educationStore.createEducation(eduForm.value)
    }
    dialogOpen.value = false
    resetForms()
    await educationStore.fetchEducations()
  } catch (error) {
    console.error('Failed to save education:', error)
  }
}

const deleteEntry = async () => {
  try {
    if (deleteType.value === 'experience') {
      await experienceStore.deleteExperience(deleteItem.value.id)
    } else {
      await educationStore.deleteEducation(deleteItem.value.id)
    }
    deleteDialogOpen.value = false
    deleteItem.value = null
  } catch (error) {
    console.error('Failed to delete:', error)
  }
}

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

const resetForms = () => {
  expForm.value = {
    id: null,
    title: '',
    date: '',
    desc: ''
  }
  eduForm.value = {
    id: null,
    title: '',
    institution: '',
    date: '',
    desc: ''
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>