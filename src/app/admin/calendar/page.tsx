"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  MoreVertical,
  Calendar as CalendarIcon,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Appointment, Service } from "@/lib/types";

const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [dynamicAppointments, setDynamicAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAppointments = useCallback(async () => {
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_time', { ascending: true });

    if (data) setDynamicAppointments(data as Appointment[]);
  }, []);

  const fetchServices = useCallback(async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('name');
    if (data) setServices(data as Service[]);
  }, []);

  useEffect(() => {
    fetchAppointments();
    fetchServices();
  }, [fetchAppointments, fetchServices]);

  const getDayFromDate = (dateStr: string) => {
    if (!dateStr) return 0;
    const d = new Date(dateStr + 'T12:00:00');
    return d.getDate();
  };

  const dayAppointments = dynamicAppointments.filter(apt => {
    const aptDay = getDayFromDate(apt.appointment_date);
    return aptDay === selectedDay;
  });

  const hasAptOnDay = (day: number) => {
    return dynamicAppointments.some(apt => getDayFromDate(apt.appointment_date) === day);
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const date = `2026-04-${selectedDay.toString().padStart(2, '0')}`;
    const time = formData.get("appointment_time") as string;

    // Check for conflicts
    const hasConflict = dynamicAppointments.some(
      apt => apt.appointment_date === date && apt.appointment_time === time
    );

    if (hasConflict) {
      toast.error("Ce créneau est déjà occupé !");
      setIsSubmitting(false);
      return;
    }

    const newApt = {
      client_name: formData.get("client_name") as string,
      service_name: formData.get("service_name") as string,
      appointment_date: date,
      appointment_time: time,
      status: "confirmed"
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([newApt])
      .select();

    if (error) {
      toast.error("Erreur: " + error.message);
    } else if (data && data.length > 0) {
      setDynamicAppointments([...dynamicAppointments, data[0]]);
      setIsModalOpen(false);
      toast.success("Rendez-vous ajouté com sucesso !");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Calendrier des Rendez-vous</h2>
          <p className="text-gray-500 text-sm font-light">Gérez votre emploi du temps en temps réel.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/5 p-1 rounded-xl border border-white/10">
            {["month", "week", "day"].map((v) => (
              <button
                key={v}
                onClick={() => {
                  setView(v as "month" | "week" | "day");
                  toast.info(`Vue changée sur ${v === 'month' ? 'Mois' : v === 'week' ? 'Semaine' : 'Jour'}`);
                }}
                className={cn(
                  "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                  view === v ? "bg-[#e76f51] text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {v === "month" ? "Mois" : v === "week" ? "Semaine" : "Jour"}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#e76f51] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#e76f51]/20 flex items-center gap-2 hover:scale-[1.02] transition-all"
          >
            <Plus className="w-4 h-4" /> Nouveau RDV
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Month View Mini */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-dark p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-sm">Avril 2026</h3>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {daysOfWeek.map(d => <span key={d} className="text-[10px] font-bold text-gray-500">{d[0]}</span>)}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i + 1)}
                  className={cn(
                    "aspect-square rounded-lg text-[10px] font-bold transition-all relative flex items-center justify-center",
                    selectedDay === i + 1 ? "bg-[#e76f51] text-white shadow-lg" : "text-gray-400 hover:bg-white/5",
                    hasAptOnDay(i + 1) && selectedDay !== i + 1 && "text-[#e76f51]"
                  )}
                >
                  {i + 1}
                  {hasAptOnDay(i + 1) && (
                    <span className={cn("absolute bottom-1 w-1 h-1 rounded-full", selectedDay === i + 1 ? "bg-white" : "bg-[#e76f51]")} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-dark p-6 rounded-3xl border border-white/5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Légende</h4>
            <div className="space-y-3">
              {[
                { label: "Confirmé", color: "bg-green-500" },
                { label: "En attente", color: "bg-amber-500" },
                { label: "Annulé", color: "bg-rose-500" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", l.color)} />
                  <span className="text-xs text-gray-400">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Detail */}
        <div className="lg:col-span-3 glass-dark rounded-[2rem] border border-white/5 overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#e76f51]/10 flex items-center justify-center text-[#e76f51]">
                <CalendarIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base">Détails du jour</h3>
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  {dayAppointments.length} rendez-vous prévu{dayAppointments.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-white transition-all bg-white/5 rounded-lg"><Plus className="w-4 h-4 md:w-5 md:h-5" /></button>
          </div>

          <div className="flex-1 p-4 md:p-8 space-y-6">
            {dayAppointments.length > 0 ? (
              dayAppointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="text-right w-16 pt-1">
                    <p className="font-bold text-sm">{apt.appointment_time}</p>
                    <p className="text-[10px] text-gray-500">60m</p>
                  </div>
                  
                  <div className="flex-1 relative pb-6 border-l-2 border-[#e76f51]/20 pl-6 md:pl-8 group-last:border-transparent">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full border-4 border-[#1a1a1a] bg-[#e76f51]" />
                    
                    <div className="bg-white/5 hover:bg-white/10 transition-all rounded-[1.5rem] p-4 md:p-6 border border-white/5 group-hover:border-[#e76f51]/30">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                        <div>
                          <h4 className="font-bold text-base md:text-lg mb-1">{apt.client_name}</h4>
                          <span className="text-[9px] md:text-[10px] font-bold bg-[#e76f51]/20 text-[#e76f51] px-2 py-0.5 rounded-full uppercase">
                            {apt.service_name}
                          </span>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-white transition-all absolute top-2 right-2 md:relative md:top-0 md:right-0">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 md:gap-6">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="w-3.5 h-3.5" /> {apt.appointment_time}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <User className="w-3.5 h-3.5" /> Lara Nails
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20">
                <CalendarIcon className="w-16 h-16 mb-4" />
                <p className="font-serif italic text-lg">Aucun rendez-vous pour ce jour.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">Nouveau Rendez-vous</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom de la cliente</label>
                  <input required name="client_name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Prestation</label>
                  <select required name="service_name" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all">
                    {services.length > 0 ? (
                      services.map(s => <option key={s.id} value={s.name}>{s.name} ({s.price} €)</option>)
                    ) : (
                      <>
                        <option>Manucure Russe</option>
                        <option>Nail Art Autoral</option>
                        <option>Allongement Gel</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</label>
                    <input disabled type="text" value={`Avril ${selectedDay}, 2026`} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none text-gray-400 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heure</label>
                    <input required name="appointment_time" type="time" defaultValue="14:00" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all" />
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full py-4 mt-4 bg-[#e76f51] text-white rounded-xl font-bold shadow-lg shadow-[#e76f51]/20 hover:scale-[1.02] transition-transform disabled:opacity-50">
                  {isSubmitting ? "Chargement..." : "Confirmer le RDV"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
