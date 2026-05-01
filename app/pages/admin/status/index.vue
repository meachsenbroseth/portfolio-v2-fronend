<template>
  <div class="space-y-8 font-mono">

    <!-- ── HEADER ── -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-[#e0dddc]">
      <div class="space-y-1">
        <h1 class="text-2xl font-black tracking-tight text-[#131313]">BACKGROUND</h1>
        <p class="text-xs text-[#5d5f5f]">Manage experience and education records</p>
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <Button
          @click="openAddDialog('experience')"
          class="h-9 gap-2 text-[10px] tracking-[0.15em] uppercase font-bold bg-[#131313] text-white hover:bg-[#333] border-0"
        >
          <Plus class="h-3.5 w-3.5" />
          Add Experience
        </Button>
        <Button
          variant="outline"
          @click="openAddDialog('education')"
          class="h-9 gap-2 text-[10px] tracking-[0.15em] uppercase font-bold border-[#e0dddc] text-[#5d5f5f] hover:border-[#131313] hover:text-[#131313] hover:bg-transparent"
        >
          <Plus class="h-3.5 w-3.5" />
          Add Education
        </Button>
      </div>
    </div>

    <!-- ── LOADING ── -->
    <div v-if="experienceStore.loading || educationStore.loading"
      class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="border border-[#e0dddc] px-6 py-4 space-y-3">
        <div class="w-48 h-3 border border-[#e0dddc] overflow-hidden">
          <div class="h-full animate-[loading_1.5s_ease-in-out_infinite]"
            style="background: repeating-linear-gradient(45deg, #131313 0px, #131313 8px, #f5f3f2 8px, #f5f3f2 16px);">
          </div>
        </div>
        <p class="text-[9px] tracking-[0.2em] uppercase text-[#aaa]">fetching records...</p>
      </div>
    </div>

    <div v-else class="space-y-6">

      <!-- ── EXPERIENCE TABLE ── -->
      <div class="border border-[#e0dddc]">
        <!-- Section header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-[#e0dddc] bg-[#fafafa]">
          <div class="flex items-center gap-3">
            <Icon name="ph:briefcase-bold" size="16" class="text-[#131313]" />
            <div>
              <h2 class="text-[11px] font-black uppercase tracking-[0.2em] text-[#131313]">experience.sys</h2>
              <p class="text-[9px] text-[#aaa] mt-0.5">{{ experienceStore.experiences?.length || 0 }} records found</p>
            </div>
          </div>
          <span class="text-[9px] tracking-[0.15em] uppercase text-[#aaa]">
            ID_EXP / {{ String(experienceStore.experiences?.length || 0).padStart(3, '0') }}
          </span>
        </div>

        <!-- Table -->
        <Table>
          <TableHeader>
            <TableRow class="border-b border-[#e0dddc] hover:bg-transparent">
              <TableHead class="w-16 text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">ID</TableHead>
              <TableHead class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Title / Description</TableHead>
              <TableHead class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold w-32">Date</TableHead>
              <TableHead class="text-right text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="item in experienceStore.experiences"
              :key="item.id"
              class="border-b border-[#e0dddc] hover:bg-[#fafafa] transition-colors group"
            >
              <TableCell class="font-mono text-[10px] text-[#aaa] py-4">
                {{ String(item.id).padStart(3, '0') }}
              </TableCell>
              <TableCell class="py-4">
                <p class="text-[12px] font-bold text-[#131313] uppercase tracking-tight">{{ item.title }}</p>
                <p class="text-[11px] text-[#5d5f5f] line-clamp-1 mt-0.5 leading-relaxed">{{ item.desc }}</p>
              </TableCell>
              <TableCell class="py-4">
                <span class="text-[10px] border border-[#e0dddc] px-2 py-1 text-[#5d5f5f] tracking-widest whitespace-nowrap">
                  {{ item.date }}
                </span>
              </TableCell>
              <TableCell class="py-4">
                <div class="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-7 w-7 hover:bg-[#131313] hover:text-white transition-colors"
                    @click="openEditDialog('experience', item)"
                  >
                    <Pencil class="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-7 w-7 hover:bg-red-500 hover:text-white transition-colors"
                    @click="confirmDelete('experience', item)"
                  >
                    <Trash2 class="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>

            <!-- Empty -->
            <TableRow v-if="!experienceStore.experiences?.length">
              <TableCell colspan="4" class="py-16">
                <div class="flex flex-col items-center gap-3 text-center">
                  <Icon name="ph:briefcase" size="28" class="text-[#e0dddc]" />
                  <p class="text-[10px] tracking-[0.2em] uppercase text-[#aaa]">→ No experience records found</p>
                  <button
                    @click="openAddDialog('experience')"
                    class="text-[10px] tracking-widest uppercase text-[#131313] underline underline-offset-2 hover:no-underline"
                  >Add your first entry</button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- ── EDUCATION TABLE ── -->
      <div class="border border-[#e0dddc]">
        <div class="flex items-center justify-between px-5 py-4 border-b border-[#e0dddc] bg-[#fafafa]">
          <div class="flex items-center gap-3">
            <Icon name="ph:graduation-cap-bold" size="16" class="text-[#131313]" />
            <div>
              <h2 class="text-[11px] font-black uppercase tracking-[0.2em] text-[#131313]">education.cfg</h2>
              <p class="text-[9px] text-[#aaa] mt-0.5">{{ educationStore.educations?.length || 0 }} records found</p>
            </div>
          </div>
          <span class="text-[9px] tracking-[0.15em] uppercase text-[#aaa]">
            ID_EDU / {{ String(educationStore.educations?.length || 0).padStart(3, '0') }}
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow class="border-b border-[#e0dddc] hover:bg-transparent">
              <TableHead class="w-16 text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">ID</TableHead>
              <TableHead class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Title / Description</TableHead>
              <TableHead class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold w-40">Institution</TableHead>
              <TableHead class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold w-32">Date</TableHead>
              <TableHead class="text-right text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="item in educationStore.educations"
              :key="item.id"
              class="border-b border-[#e0dddc] hover:bg-[#fafafa] transition-colors group"
            >
              <TableCell class="font-mono text-[10px] text-[#aaa] py-4">
                {{ String(item.id).padStart(3, '0') }}
              </TableCell>
              <TableCell class="py-4">
                <p class="text-[12px] font-bold text-[#131313] uppercase tracking-tight">{{ item.title }}</p>
                <p class="text-[11px] text-[#5d5f5f] line-clamp-1 mt-0.5 leading-relaxed">{{ item.desc }}</p>
              </TableCell>
              <TableCell class="py-4">
                <span class="text-[11px] text-[#5d5f5f]">{{ item.institution }}</span>
              </TableCell>
              <TableCell class="py-4">
                <span class="text-[10px] border border-[#e0dddc] px-2 py-1 text-[#5d5f5f] tracking-widest whitespace-nowrap">
                  {{ item.date }}
                </span>
              </TableCell>
              <TableCell class="py-4">
                <div class="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-7 w-7 hover:bg-[#131313] hover:text-white transition-colors"
                    @click="openEditDialog('education', item)"
                  >
                    <Pencil class="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-7 w-7 hover:bg-red-500 hover:text-white transition-colors"
                    @click="confirmDelete('education', item)"
                  >
                    <Trash2 class="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>

            <!-- Empty -->
            <TableRow v-if="!educationStore.educations?.length">
              <TableCell colspan="5" class="py-16">
                <div class="flex flex-col items-center gap-3 text-center">
                  <Icon name="ph:graduation-cap" size="28" class="text-[#e0dddc]" />
                  <p class="text-[10px] tracking-[0.2em] uppercase text-[#aaa]">→ No education records found</p>
                  <button
                    @click="openAddDialog('education')"
                    class="text-[10px] tracking-widests uppercase text-[#131313] underline underline-offset-2 hover:no-underline"
                  >Add your first entry</button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    <!-- ── ADD/EDIT DIALOG ── -->
    <Dialog v-model:open="dialogOpen">
      <DialogContent class="max-w-lg font-mono border border-[#e0dddc] shadow-none p-0 gap-0">

        <!-- Dialog header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-[#e0dddc] bg-[#fafafa]">
          <div class="space-y-0.5">
            <p class="text-[9px] tracking-[0.25em] uppercase text-[#aaa]">
              // {{ isEditing ? 'edit' : 'create' }}.{{ dialogType }}
            </p>
            <DialogTitle class="text-[13px] font-black uppercase tracking-tight text-[#131313]">
              {{ dialogType === 'experience'
                ? (isEditing ? 'Edit Experience' : 'New Experience')
                : (isEditing ? 'Edit Education' : 'New Education') }}
            </DialogTitle>
          </div>
        </div>

        <div class="px-6 py-5">
          <!-- Experience Form -->
          <form v-if="dialogType === 'experience'" @submit.prevent="saveExperience" class="space-y-4">
            <div class="space-y-1.5">
              <Label class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Title *</Label>
              <Input
                v-model="expForm.title"
                required
                placeholder="e.g. Full-Stack Developer"
                class="border-[#e0dddc] text-[12px] font-mono focus:border-[#131313] focus:ring-0 h-9"
              />
            </div>
            <div class="space-y-1.5">
              <Label class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Date *</Label>
              <Input
                v-model="expForm.date"
                required
                placeholder="2023 — 2024"
                class="border-[#e0dddc] text-[12px] font-mono focus:border-[#131313] focus:ring-0 h-9"
              />
            </div>
            <div class="space-y-1.5">
              <Label class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Description *</Label>
              <Textarea
                v-model="expForm.desc"
                required
                rows="4"
                placeholder="Describe your role and responsibilities..."
                class="border-[#e0dddc] text-[12px] font-mono focus:border-[#131313] focus:ring-0 resize-none"
              />
            </div>

            <div class="flex justify-end gap-2 pt-2 border-t border-[#e0dddc]">
              <Button
                variant="outline"
                type="button"
                @click="dialogOpen = false"
                class="h-8 text-[10px] tracking-[0.15em] uppercase font-bold border-[#e0dddc] hover:border-[#131313] hover:bg-transparent"
              >Cancel</Button>
              <Button
                type="submit"
                :disabled="experienceStore.loading"
                class="h-8 text-[10px] tracking-[0.15em] uppercase font-bold bg-[#131313] hover:bg-[#333] border-0"
              >
                {{ experienceStore.loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
              </Button>
            </div>
          </form>

          <!-- Education Form -->
          <form v-else @submit.prevent="saveEducation" class="space-y-4">
            <div class="space-y-1.5">
              <Label class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Title *</Label>
              <Input
                v-model="eduForm.title"
                required
                placeholder="e.g. Computer Science & Engineering"
                class="border-[#e0dddc] text-[12px] font-mono focus:border-[#131313] focus:ring-0 h-9"
              />
            </div>
            <div class="space-y-1.5">
              <Label class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Institution *</Label>
              <Input
                v-model="eduForm.institution"
                required
                placeholder="e.g. Royal University of Phnom Penh"
                class="border-[#e0dddc] text-[12px] font-mono focus:border-[#131313] focus:ring-0 h-9"
              />
            </div>
            <div class="space-y-1.5">
              <Label class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Date *</Label>
              <Input
                v-model="eduForm.date"
                required
                placeholder="2020 — 2024"
                class="border-[#e0dddc] text-[12px] font-mono focus:border-[#131313] focus:ring-0 h-9"
              />
            </div>
            <div class="space-y-1.5">
              <Label class="text-[9px] tracking-[0.2em] uppercase text-[#aaa] font-bold">Description *</Label>
              <Textarea
                v-model="eduForm.desc"
                required
                rows="4"
                placeholder="Describe your studies and achievements..."
                class="border-[#e0dddc] text-[12px] font-mono focus:border-[#131313] focus:ring-0 resize-none"
              />
            </div>

            <div class="flex justify-end gap-2 pt-2 border-t border-[#e0dddc]">
              <Button
                variant="outline"
                type="button"
                @click="dialogOpen = false"
                class="h-8 text-[10px] tracking-[0.15em] uppercase font-bold border-[#e0dddc] hover:border-[#131313] hover:bg-transparent"
              >Cancel</Button>
              <Button
                type="submit"
                :disabled="educationStore.loading"
                class="h-8 text-[10px] tracking-[0.15em] uppercase font-bold bg-[#131313] hover:bg-[#333] border-0"
              >
                {{ educationStore.loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- ── DELETE DIALOG ── -->
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent class="font-mono border border-[#e0dddc] shadow-none max-w-sm p-0 gap-0">
        <div class="px-6 py-5 border-b border-[#e0dddc] bg-[#fafafa]">
          <p class="text-[9px] tracking-[0.25em] uppercase text-[#aaa]">// confirm.delete</p>
          <AlertDialogTitle class="text-[13px] font-black uppercase tracking-tight text-[#131313] mt-1">
            Delete Entry?
          </AlertDialogTitle>
        </div>
        <div class="px-6 py-5 space-y-4">
          <AlertDialogDescription class="text-[12px] text-[#5d5f5f] leading-relaxed">
            This will permanently delete
            <span class="font-bold text-[#131313]">"{{ deleteItem?.title }}"</span>.
            This action cannot be undone.
          </AlertDialogDescription>
          <div class="flex justify-end gap-2">
            <AlertDialogCancel
              class="h-8 text-[10px] tracking-[0.15em] uppercase font-bold border-[#e0dddc] hover:border-[#131313] hover:bg-transparent font-mono"
            >Cancel</AlertDialogCancel>
            <AlertDialogAction
              @click="deleteEntry"
              class="h-8 text-[10px] tracking-[0.15em] uppercase font-bold bg-red-500 hover:bg-red-600 border-0 font-mono"
            >Delete</AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus, Pencil, Trash2, Briefcase, GraduationCap } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin-layout',
  middleware: 'auth',
})

const experienceStore = useExperienceStore()
const educationStore = useEducationStore()

const dialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const isEditing = ref(false)
const dialogType = ref('experience')
const deleteType = ref('experience')
const deleteItem = ref(null)

const expForm = ref({ id: null, title: '', date: '', desc: '' })
const eduForm = ref({ id: null, title: '', institution: '', date: '', desc: '' })

const resetForms = () => {
  expForm.value = { id: null, title: '', date: '', desc: '' }
  eduForm.value = { id: null, title: '', institution: '', date: '', desc: '' }
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
  if (type === 'experience') expForm.value = { ...item }
  else eduForm.value = { ...item }
  dialogOpen.value = true
}

const saveExperience = async () => {
  try {
    if (isEditing.value) await experienceStore.updateExperience(expForm.value.id, expForm.value)
    else await experienceStore.createExperience(expForm.value)
    dialogOpen.value = false
    resetForms()
    await experienceStore.fetchExperiences()
  } catch (e) { console.error(e) }
}

const saveEducation = async () => {
  try {
    if (isEditing.value) await educationStore.updateEducation(eduForm.value.id, eduForm.value)
    else await educationStore.createEducation(eduForm.value)
    dialogOpen.value = false
    resetForms()
    await educationStore.fetchEducations()
  } catch (e) { console.error(e) }
}

const confirmDelete = (type, item) => {
  deleteType.value = type
  deleteItem.value = item
  deleteDialogOpen.value = true
}

const deleteEntry = async () => {
  try {
    if (deleteType.value === 'experience') {
      await experienceStore.deleteExperience(deleteItem.value.id)
      await experienceStore.fetchExperiences()
    } else {
      await educationStore.deleteEducation(deleteItem.value.id)
      await educationStore.fetchEducations()
    }
    deleteDialogOpen.value = false
    deleteItem.value = null
  } catch (e) { console.error(e) }
}

onMounted(async () => {
  await Promise.all([
    experienceStore.fetchExperiences(),
    educationStore.fetchEducations(),
  ])
})
</script>

<style scoped>
*, *::before, *::after { border-radius: 0 !important; }

@keyframes loading {
  0%   { width: 10%; }
  50%  { width: 80%; }
  100% { width: 10%; }
}
</style>