-- Table: public.demandesconges

-- DROP TABLE IF EXISTS public.demandesconges;

CREATE TABLE IF NOT EXISTS public.demandesconges
(
    id_demande integer NOT NULL DEFAULT nextval('demandesconges_id_demande_seq'::regclass),
    id_employe integer,
    typecongeid character varying(100) COLLATE pg_catalog."default",
    datedebut date,
    datefin date,
    statut character varying(20) COLLATE pg_catalog."default" DEFAULT 'En-attente'::character varying,
    motif text COLLATE pg_catalog."default",
    nom character varying(255) COLLATE pg_catalog."default",
    prenom character varying(255) COLLATE pg_catalog."default",
    date_demande character varying(100) COLLATE pg_catalog."default",
    jours integer,
    CONSTRAINT demandesconges_pkey PRIMARY KEY (id_demande),
    CONSTRAINT demandesconges_id_employe_fkey FOREIGN KEY (id_employe)
        REFERENCES public.employes (id_employe) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.demandesconges
    OWNER to postgres;

-- Table: public.employes

-- DROP TABLE IF EXISTS public.employes;

CREATE TABLE IF NOT EXISTS public.employes
(
    id_employe integer NOT NULL DEFAULT nextval('employes_id_employe_seq'::regclass),
    nom character varying(50) COLLATE pg_catalog."default",
    prenom character varying(50) COLLATE pg_catalog."default",
    poste character varying(50) COLLATE pg_catalog."default" DEFAULT 'employe'::character varying,
    departement character varying(50) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    solde_conges integer DEFAULT 30,
    pwd character varying(50) COLLATE pg_catalog."default",
    genre character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT employes_pkey PRIMARY KEY (id_employe)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employes
    OWNER to postgres;


-- Table: public.historique_conges

-- DROP TABLE IF EXISTS public.historique_conges;

CREATE TABLE IF NOT EXISTS public.historique_conges
(
    id_historique integer NOT NULL DEFAULT nextval('historique_conges_id_historique_seq'::regclass),
    id_demande integer,
    date_action date NOT NULL,
    action character varying(20) COLLATE pg_catalog."default" NOT NULL,
    date_demande character varying(100) COLLATE pg_catalog."default",
    date_debut character varying(100) COLLATE pg_catalog."default",
    date_fin character varying(100) COLLATE pg_catalog."default",
    id_employe character varying(255) COLLATE pg_catalog."default",
    jours integer,
    nom character varying(100) COLLATE pg_catalog."default",
    prenom character varying(100) COLLATE pg_catalog."default",
    type_conge character varying(100) COLLATE pg_catalog."default",
    motif character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT historique_conges_pkey PRIMARY KEY (id_historique)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.historique_conges
    OWNER to postgres;