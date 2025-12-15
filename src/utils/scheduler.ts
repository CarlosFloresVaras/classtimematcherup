
import { Class, ScheduleCombination, TimeSlot } from '../types/schedule';
import { timeToMinutes } from './parser';

export function generateScheduleCombinations(allClasses: Class[]): ScheduleCombination[] {
  // Agrupar clases por materia
  const classesBySubject: { [key: string]: Class[] } = {};
  
  allClasses.forEach(cls => {
    if (!classesBySubject[cls.materia]) {
      classesBySubject[cls.materia] = [];
    }
    classesBySubject[cls.materia].push(cls);
  });
  
  // Generar todas las combinaciones posibles
  const subjects = Object.keys(classesBySubject);
  const combinations = generateCombinations(classesBySubject, subjects);
  
  // Verificar conflictos y crear objetos de combinación
  return combinations.map((combination, index) => ({
    id: `combo-${index}`,
    classes: combination,
    conflicts: hasTimeConflicts(combination)
  }));
}

function generateCombinations(classesBySubject: { [key: string]: Class[] }, subjects: string[]): Class[][] {
  if (subjects.length === 0) return [[]];
  
  const [firstSubject, ...restSubjects] = subjects;
  const restCombinations = generateCombinations(classesBySubject, restSubjects);
  const combinations: Class[][] = [];
  
  for (const cls of classesBySubject[firstSubject]) {
    for (const restCombination of restCombinations) {
      combinations.push([cls, ...restCombination]);
    }
  }
  
  return combinations;
}

export function hasTimeConflicts(classes: Class[]): boolean {
  const timeSlots: TimeSlot[] = [];
  
  // Convertir todas las clases a time slots
  for (const cls of classes) {
    for (const day of cls.dias) {
      timeSlots.push({
        day,
        startTime: timeToMinutes(cls.horaInicio),
        endTime: timeToMinutes(cls.horaFin)
      });
    }
  }
  
  // Verificar overlaps
  for (let i = 0; i < timeSlots.length; i++) {
    for (let j = i + 1; j < timeSlots.length; j++) {
      if (hasOverlap(timeSlots[i], timeSlots[j])) {
        return true;
      }
    }
  }
  
  return false;
}

function hasOverlap(slot1: TimeSlot, slot2: TimeSlot): boolean {
  if (slot1.day !== slot2.day) return false;
  
  return (
    (slot1.startTime < slot2.endTime && slot1.endTime > slot2.startTime)
  );
}

export function getScheduleStats(combination: ScheduleCombination) {
  const totalClasses = combination.classes.length;
  const subjects = new Set(combination.classes.map(c => c.materia)).size;
  const days = new Set(combination.classes.flatMap(c => c.dias));
  
  return {
    totalClasses,
    subjects,
    daysCount: days.size,
    days: Array.from(days).sort()
  };
}
