---
title: Public Databases
description: "Explore major public bioinformatics databases, their roles, standards, and practical use for accessing sequences, genomes, variants, and functional data"
svg: /genomics.svg
author: Aleksandra Badaczewska

header:
  overlay_image: 07-wrangling/assets/img/07_data_acquisition_banner.png
index: 
order: 4
wg: Bioinformatics
description: ""
type: reference material

objectives: 
  - Understand the role of public databases in storing, curating, and sharing biological data.  
  - Recognize the scope and focus of major bioinformatics databases.  
  - Learn how to access, query, and download relevant datasets.  
  - Develop awareness of data integration across different databases.  

applications:
  - Retrieving reference genomes, transcriptomes, and protein sequences.  
  - Obtaining annotation files for genomic features.  
  - Accessing curated variant and disease-associated datasets.  
  - Using specialized repositories to guide experimental design and validation.  

terms: [Primary Database, Secondary Database, Data Curation, Accession Number, Metadata]

takeaways: 
  - Always check the primary source of data and the version (e.g., genome assembly build, annotation release).  
  - Be aware of redundancy and overlap - some databases mirror or repackage others.  
  - Use stable identifiers (accession numbers, Ensembl IDs, UniProt IDs) for reproducibility.  
  - Combine multiple resources to cross-validate and enrich analysis, but track provenance.  
  - Pay attention to update cycles - newer is not always better for reproducibility.  

overview: [objectives, applications, terminology]


questions:
  - question: "If you want to deposit newly generated RNA-seq raw reads from your project, which database should you submit them to?"
    title: "Submitting Raw Reads"
    qid: 1
    solution: "Raw high-throughput sequencing data, such as RNA-seq reads, should be submitted to the **Sequence Read Archive (SRA)** (or via ENA/DDBJ, which synchronize through INSDC)."

  - question: "Before submitting a new dataset to ArrayExpress, what is the most important preparation step?"
    title: "ArrayExpress Submissions"
    qid: 2
    solution: "Prepare **MAGE-TAB metadata files (IDF + SDRF)** with clear sample annotations and experimental design - ArrayExpress requires structured metadata alongside raw/processed data."

  - question: "What is the practical difference between Ensembl and UCSC Genome Browser for genome annotations?"
    title: "Annotation Resources"
    qid: 3
    answers:
      - Ensembl integrates variation and comparative genomics, while UCSC focuses on customizable visualization and tracks.
      - UCSC provides curated transcript models, while Ensembl only stores raw reads.
      - Ensembl requires manual submission, UCSC does not.
    responses:
      - Correct! Ensembl is strong in annotation and comparative genomics, UCSC excels in visualization and custom track integration.
      - GEO/GEO-like repositories provide transcriptomic data, not UCSC.
      - Both UCSC and Ensembl are reference resources, not submission archives.
    answer: 1

  - question: "You need a non-redundant, curated reference sequence of the TP53 gene for annotation. Which database is the best choice?"
    title: "Curated Gene References"
    qid: 4
    solution: "**RefSeq** provides stable, curated, and non-redundant reference sequences for genes, transcripts, and proteins."

  - question: "What is the main difference between dbSNP and ClinVar when looking up a variant?"
    title: "Variant Databases"
    qid: 5
    answers:
      - dbSNP archives all kinds of variants, while ClinVar focuses on clinical significance.
      - ClinVar includes population frequencies, dbSNP does not.
      - dbSNP only includes SNPs, ClinVar includes SNPs and indels.
    responses:
      - Correct! dbSNP is a general archive of variants, while ClinVar adds expert-curated clinical interpretations.
      - Population frequencies are provided by **gnomAD**, not ClinVar.
      - dbSNP also includes small indels, not just SNPs.
    answer: 1

  - question: "When downloading gnomAD population frequency data for human genome build GRCh38, which file format will you typically work with?"
    title: "Variant Frequency Format"
    qid: 6
    solution: "gnomAD distributes variant frequency data as **VCF files**, which can then be indexed and queried with tools like `bcftools`."

  - question: "You want to visualize gene expression datasets without downloading gigabytes of FASTQ files. Which GEO file type is best to start with?"
    title: "Expression Data Formats"
    qid: 7
    solution: "The **Series Matrix File (TXT)** in GEO contains processed, normalized expression data with sample annotations, suitable for immediate analysis."

  - question: "If your project requires running GO enrichment analysis on a gene list, which type of database do you need to query?"
    title: "Functional Enrichment"
    qid: 8
    solution: "You need an **ontology/functional annotation database** like **Gene Ontology (GO)**, which classifies genes into biological processes, molecular functions, and cellular components."

  - question: "Which database should you check if you want to download pathway diagrams for glycolysis to include in a publication?"
    title: "Pathway Resources"
    qid: 9
    solution: "**KEGG** provides pathway maps (including glycolysis) in formats such as KGML (XML) and tabular exports, widely used in publications."

  - question: "What is the main practical difference between UniProt Swiss-Prot and UniProt TrEMBL entries?"
    title: "Protein Database Curation"
    qid: 10
    answers:
      - Swiss-Prot entries are manually curated and reviewed, while TrEMBL entries are computationally annotated and unreviewed.
      - Swiss-Prot contains only DNA sequences, while TrEMBL contains proteins.
      - TrEMBL entries can’t be searched with BLAST, while Swiss-Prot can.
    responses:
      - Correct! Swiss-Prot = reviewed/manual; TrEMBL = unreviewed/automated.
      - Both Swiss-Prot and TrEMBL contain proteins, not DNA.
      - Both subsets can be queried with BLAST.
    answer: 1


---


## Overview

Bioinformatics depends on **public databases** to store, organize, and share the vast amounts of biological data generated worldwide. 
These resources provide access to curated reference genomes, protein sequences, functional annotations, and clinical variants. 
They act as the foundation of reproducible research, ensuring that scientists across disciplines can work with consistent, validated, and accessible datasets.  

In this reference material, you will explore the major bioinformatics databases used in genomics, transcriptomics, and proteomics. 
You’ll learn what each database contains, how to access it online, and why version tracking and stable identifiers are critical for reliable analyses.  

{% include overviews %}


## The role of public databases

Modern bioinformatics would not be possible without centralized, publicly available databases. 
They serve as the **infrastructure for biological discovery**, enabling researchers to access reference genomes, protein sequences, and curated annotations without recreating datasets from scratch. 
Public repositories ensure **consistency and transparency**, allowing results to be compared across studies and tools. 
They also act as **long-term archives**, preserving data generated by large international consortia as well as individual research groups.  

#### Why public databases matter?

- provide centralized access to reference data  
- reduce redundancy and duplication of effort  
- support interoperability between tools and formats  


## Primary vs. secondary databases

Databases can be broadly divided into *primary* and *secondary* resources.  

| Database     | Content | Examples | Role |
|--------------|---------|----------|------|
| **primary**  | collect raw experimental data submitted directly by researchers     | nucleotide sequences (`GenBank`, `ENA`, `DDBJ`) or high-throughput reads (`SRA`) | These repositories function as global archives for raw data retieval. |  
|**secondary** | provide high-quality sequences, annotations and specialized subsets | e.g., `RefSeq` (non-redundant reference sequences) or `UniProt` (protein function and structure) | These repositories reprocess, annotate, and curate data from primary sources. |

Understanding this distinction helps you choose the right source:  
- turn to **primary databases** when you need the *original, unprocessed experimental data*,  
- use **secondary databases** when you need *curated, standardized datasets* that are ready for analysis.  
 
<div class="highlighted highlighted--warning ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Before choosing a database</h4>
- **Primary databases** archive all submitted data, which means they may include redundant entries, unverified sequences, or low-quality submissions.  
- **Secondary databases** apply curation and filtering, but in doing so may omit rare variants, novel transcripts, or preliminary annotations.  

Always confirm which resource a tool or pipeline expects - using the wrong source can lead to mismatches in identifiers, missing features, or inconsistent results.  
</div>
</div>


## Standards, identifiers, curation

Databases adopt **standardized formats** (e.g., [FASTA](/bioinformatics/resources/file_formats#fasta) for sequences, 
[GTF](/bioinformatics/resources/file_formats#gtf)/[GFF](/bioinformatics/resources/file_formats#gff) for annotations, 
[VCF](/bioinformatics/resources/file_formats#vcf--bcf) for variants) to ensure interoperability with analysis tools. 
This consistency allows researchers to combine data from multiple sources, run them through shared pipelines, and reproduce analyses without manual reformatting.  

Every database entry is tagged with a **stable identifier** (*accession number*, *Ensembl ID*, *UniProt ID*), which acts as a permanent reference. 
This is essential for reproducibility, since gene names, annotations, and sequence versions may change over time, but the identifier remains constant.  

Finally, one of the greatest strengths of public databases lies in their use of **curation**. 
Some rely on *automated pipelines* to process submissions, while others involve *expert manual review* (e.g., `GENCODE`, `Swiss-Prot`). 
Both approaches aim to improve data quality, but awareness of their scope is essential when interpreting results.  

## Browse databases

{% include table caption="A list of bioinformatics databases, spanning sequences, genomes, variants, expression data, protein structures, and pathways." sortable=true no-row-labels=true content="|#| database | category | content | format(s) | identifier(s) | curation |
|---|----------|----------|---------|-----------|---------------|----------|
| 1  | [**GenBank**](https://www.ncbi.nlm.nih.gov/genbank/) | sequence *(primary)* | nucleotide&nbsp;sequences | FASTA, GenBank&nbsp;flatfile | accession number <br>(*MN908947.3*) | automated, some manual |
| 2  | [**ENA**](https://www.ebi.ac.uk/ena) | sequence *(primary)* | nucleotide sequences & raw reads | FASTA, FASTQ, EMBL flatfile | run/study/sample ID <br>(*ERR000111*) | automated |
| 3  | [**DDBJ**](https://www.ddbj.nig.ac.jp) | sequence *(primary)* | nucleotide sequences | FASTA, DDBJ flatfile | accession number <br>(*AB000001*) | automated + some manual |
| 4  | [**miRBase**](https://www.mirbase.org/) | sequence *(specialized)* | microRNA sequences & annotations | FASTA, GFF | miRBase ID <br>(*hsa-let-7a-1*) | manual/expert |
| 5  | [**RefSeq**](https://www.ncbi.nlm.nih.gov/refseq/) | curated sequences | reference genomes, transcripts, proteins | FASTA, GenBank flatfile | RefSeq accession <br>(*NM_000546.6*) | automated + manual/expert |
| 6  | [**Ensembl**](https://www.ensembl.org/) | genome, annotation | genome assembly, gene model, variation | FASTA, VCF, GTF/GFF3 | Ensembl ID <br>(*ENSG00000139618*) | automated + manual/expert |
| 7  | [**UCSC Genome Browser**](https://genome.ucsc.edu/) | genome, annotation | genome assembly, annotations, tracks | GTF/GFF, BED, FASTA, bigWig | UCSC ID / track name <br>(*uc001aaa.3*) | automated |
| 8  | [**GENCODE**](https://www.gencodegenes.org/) | annotation | comprehensive gene, transcript annotation | GTF/GFF3 | Ensembl/GENCODE <br>(*ENST00000456328*) | automated + manual/expert |
| 9  | [**dbSNP**](https://www.ncbi.nlm.nih.gov/snp/) | variation | SNPs, indels, short genetic variants | VCF | rsID <br>(*rs7412*) | automated |
|10  | [**ClinVar**](https://www.ncbi.nlm.nih.gov/clinvar/) | variation (clinical) | variants with clinical significance | VCF, XML | ClinVar accession <br>(*RCV000198123*) | manual/expert |
|11  | [**gnomAD**](https://gnomad.broadinstitute.org/) | variation (population) | population allele frequencies | VCF | variant ID <br>(*1:55516888:G:A*) | automated |
|12  | [**SRA**](https://www.ncbi.nlm.nih.gov/sra) | gene expression | raw sequencing reads | FASTQ | run ID <br>(*SRR390728*) | automated |
|13  | [**GEO**](https://www.ncbi.nlm.nih.gov/geo/) | gene expression | gene expression, RNA-seq, microarray | series matrix (TXT), SOFT, MINiML | GEO accession <br>(*GSE12345*) | automated |
|14  | [**ArrayExpress**](https://www.ebi.ac.uk/arrayexpress/) | gene expression | transcriptomics & functional_genomics | MAGE-TAB, FASTQ | ArrayExpress ID <br>(*E-MTAB-3050*) | automated + manual/expert |
|15  | [**Gene Ontology (GO)**](http://geneontology.org/) | functional enrichment | gene function classification | OBO, GAF | GO ID <br>(*GO:0006915*) | manual/expert |
|16  | [**KEGG**](https://www.genome.jp/kegg/) | functional enrichment | metabolic, signaling, disease pathways | KGML (XML), tabular | KEGG ID <br>(*hsa00010*) | manual/expert |
|17  | [**Reactome**](https://reactome.org/) | functional enrichment | biological pathways & reactions | BioPAX, SBML | Reactome ID <br>(*R-HSA-109581*) | manual/expert |
|18  | [**UniProt**](https://www.uniprot.org/) TrEMBL / SP | protein | protein sequences, function, structure | FASTA, TSV, XML | UniProtKB ID <br>(*P38398*) | automated; manual/expert |
|19  | [**PDB**](https://www.rcsb.org/) | protein *(structure)* | 3D protein & nucleic acid structures | PDB, mmCIF | PDB ID <br>(*1A1X*) | manual/expert |" %}


<div class="process-list " markdown="1">

### ➔ Sequence databases

The foundation of bioinformatics is built on sequence repositories. Three **primary nucleotide archives**: [GenBank](#genbank), [ENA](#ena), and [DDBJ](#ddbj), 
operate as a unified system under the *International Nucleotide Sequence Database Collaboration ([INSDC](https://www.insdc.org))*. Submissions to any one archive are synchronized across all three, 
ensuring a globally consistent, comprehensive collection of sequence data. Beyond raw archival data, **curated secondary resources** such as [RefSeq](#refseq) or [miRBase](#mirbase) 
provide **non-redundant reference sequences** for genes, transcripts, proteins, and non-coding RNAs.

<div class="usa-accordion " >

<!-- GenBank -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>GenBank</h2><span style='font-weight: 300;'>(primary) nucleotide sequences; submissions from researchers worldwide</span>" class="outline" controls="db-seq-1" icon=false %}
<div id="db-seq-1" class="accordion_content" markdown='1' hidden> 
**Full name:** GenBank – NCBI Genetic Sequence Database  
**URL:** <https://www.ncbi.nlm.nih.gov/genbank/>  
**FTP:** <https://ftp.ncbi.nlm.nih.gov/genbank/> ([README.genbank](https://ftp.ncbi.nlm.nih.gov/genbank/README.genbank))  
**Scope:** nucleotide sequences (DNA, RNA; assembled and unassembled) 

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="genbank-1" icon=false %}
<div id="genbank-1" class="accordion_content" markdown='1' hidden>

- part of the International Nucleotide Sequence Database Collaboration (INSDC); daily data exchange with ENA and DDBJ  
- global public repository for **all nucleotide sequence submissions**, from individual labs and large sequencing centers  
- accepts sequences across species, from genomes to plasmids, ESTs, and synthetic  
- **identifiers:** *accession numbers* (stable) and *GI numbers* (deprecated but still encountered in legacy data)  
- **data formats:** `FASTA`, `GenBank flatfile` (rich annotation), `ASN.1` (internal format)  

</div>

{% include accordion title="Applications" class=" " controls="genbank-2" icon=false %}
<div id="genbank-2" class="accordion_content" markdown='1' hidden>

- retrieve nucleotide sequences for **comparative genomics, primer design, or database building**  
- access **legacy or unusual sequences** not yet in curated references (e.g., novel virus)  
- essential for **BLAST searches**, since it pulls directly from GenBank’s sequence archive  

Tools like **Prokka**, **funannotate**, **BLAST+**, or **Biopython** may require GenBank-format files locally, but many workflows only need to download specific entries on demand.

</div>

{% include accordion title="Limitations" class=" " controls="genbank-3" icon=false %}
<div id="genbank-3" class="accordion_content" markdown='1' hidden>

- **redundancy**: multiple submissions of the same sequence may exist, with differences  
- **annotation quality**: metadata is submitted by researchers and not always standardized  
- naming inconsistencies between submissions can complicate automated pipelines  

</div>

{% include accordion title="Practical Tips" class=" " controls="genbank-4" icon=false %}
<div id="genbank-4" class="accordion_content" markdown='1' hidden>

- keep track of **GenBank release version** (updated biweekly) to ensure consistent results in long-term projects  
- always use **accession numbers** when citing sequences (gene names can change)  
- when downloading large datasets, use **[NCBI FTP/rsync mirrors](https://ftp.ncbi.nlm.nih.gov/genbank/)** for efficiency  
- check if a curated **[RefSeq](#refseq) record** is available for your sequence of interest (more stable for downstream use)  

</div>

{% include accordion title="CLI download" class=" " controls="genbank-5" icon=false %}
<div id="genbank-5" class="accordion_content" markdown='1' hidden>
Due to the large size of GenBank, it’s not typical to download the entire database. 
Instead, specific entries are usually retrieved on demand using tools like [Entrez Direct](https://www.ncbi.nlm.nih.gov/books/NBK179288/) ( module `edirect`), 
`ncbi-genome-download`, or via programmatic access through `Biopython`.

GenBank entries can be downloaded from the NCBI FTP server: <https://ftp.ncbi.nlm.nih.gov/genbank/>  

1. Download/synchronize the latest complete release (compressed):  
```bash
rsync -av rsync://ftp.ncbi.nlm.nih.gov/genbank/ .
```

2. Download a subset (e.g., viral sequences, compressed FASTA):
```bash
wget ftp://ftp.ncbi.nlm.nih.gov/genbank/gbvrl1.seq.gz
```

3. Fetch sequences by accession using [NCBI EDirect](https://www.ncbi.nlm.nih.gov/books/NBK179288/) command-line utilities:  
```bash
module load edirect        
# or user-install if not available
sh -c "$(curl -fsSL https://ftp.ncbi.nlm.nih.gov/entrez/entrezdirect/install-edirect.sh)"
```
```bash
# Fetch a Zea mays (corn) chloroplast sequence in FASTA format
esearch -db nucleotide -query "NC_001666.2" | efetch -format fasta > corn_chloroplast.fasta
# Fetch the same record in GenBank flatfile format (with annotations)
esearch -db nucleotide -query "NC_001666.2" | efetch -format gb > corn_chloroplast.gb
```
</div>
</div>
</div>

<!-- ENA -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>ENA</h2><span style='font-weight: 300;'>(primary) nucleotide sequences & raw sequencing reads; includes SRA data</span>" class="outline" controls="db-seq-2" icon=false %}
<div id="db-seq-2" class="accordion_content" markdown='1' hidden> 
**Full name:** European Nucleotide Archive  
**URL:** <https://www.ebi.ac.uk/ena>  
**FTP:**  <https://ftp.sra.ebi.ac.uk/vol1/> (all read and analysis data)  <https://ftp.ebi.ac.uk/pub/databases/ena/> (assembled and annotated sequence data)  
**Scope:** nucleotide sequences (assembled), raw sequencing reads, study metadata  

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="ena-1" icon=false %}
<div id="ena-1" class="accordion_content" markdown='1' hidden>

- part of the International Nucleotide Sequence Database Collaboration (INSDC); daily data exchange with GenBank and DDBJ  
- accepts **assembled sequences, raw reads, and project metadata**  
- backbone of Europe’s Sequence Read Archive (SRA)  
- **identifiers:** ENA accession numbers (e.g., *PRJEB*, *ERR*, *SRR* via NCBI synchronization)  
- **data formats:** `FASTA`, `FASTQ`, XML metadata; compressed archives for raw data  

</div>

{% include accordion title="Applications" class=" " controls="ena-2" icon=false %}
<div id="ena-2" class="accordion_content" markdown='1' hidden>

- retrieve **raw read datasets** for reanalysis or benchmarking  
- access **assembled sequences** with associated experimental metadata  
- integrate with European bioinformatics pipelines (e.g., [EMBL-EBI services](https://www.ebi.ac.uk/services/))  
- often used in **meta-analyses** where raw reads are required  

</div>

{% include accordion title="Limitations" class=" " controls="ena-3" icon=false %}
<div id="ena-3" class="accordion_content" markdown='1' hidden>

- data volume is very large; downloads can be slow without optimized tools  
- metadata submission quality varies between projects  
- redundancy with GenBank/DDBJ (synchronized, but formats and portal layout differ)  

</div>

{% include accordion title="Practical Tips" class=" " controls="ena-4" icon=false %}
<div id="ena-4" class="accordion_content" markdown='1' hidden>

- use **accession numbers** consistently (`PRJEB`, `ERR`, `SRR`) to map across INSDC collab.  
- prefer the **Aspera client** (`ascp`) or `ftp/rsync` for bulk downloads (faster than HTTP)  
- [ENA browser](https://www.ebi.ac.uk/ena/browser/search) allows **programmatic queries** with filters (species, platform, etc.)  
- when working with raw reads, check if the data is already in **processed form** (e.g., via [RefSeq](#refseq) or [SRA](#sra)) before downloading terabytes unnecessarily  

</div>

{% include accordion title="CLI download" class=" " controls="ena-5" icon=false %}
<div id="ena-5" class="accordion_content" markdown='1' hidden>
Due to its large and overlapping content with [GenBank](#genbank)/[RefSeq](#refseq), it's also uncommon to mirror ENA entirely. 
Instead, specific records (assemblies, reads, etc.) are typically retrieved on demand using tools like ENA Browser CLI, enaDataGet, aspera (ascp), or wget/curl based on accession numbers.

ENA FTP server: <https://ftp.ebi.ac.uk/pub/databases/ena/>  

1. Download example record (FASTA):
```bash
wget ftp://ftp.ebi.ac.uk/pub/databases/ena/wgs/public/aaz/AAZXAA01.fasta.gz
```

2. Download raw reads by accession (e.g., ERR000100 read set (728M x2), FASTQ compressed):
```bash
wget https://ftp.sra.ebi.ac.uk/vol1/fastq/ERR000/ERR000100/ERR000100_1.fastq.gz
wget https://ftp.sra.ebi.ac.uk/vol1/fastq/ERR000/ERR000100/ERR000100_2.fastq.g
```

3. Download with Aspera (faster than FTP):
```bash
ascp -T -l 300m -P33001 \
    era-fasp@fasp.sra.ebi.ac.uk:/vol1/fastq/ERR000/ERR000100/ERR000100_1.fastq.gz ERR000100.fastq.gz
```
</div>
</div>
</div>

<!-- DDBJ -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>DDBJ</h2><span style='font-weight: 300;'>(primary) nucleotide sequences & raw sequencing reads; mirrors ENA/SRA scope</span>" class="outline" controls="db-seq-3" icon=false %}
<div id="db-seq-3" class="accordion_content" markdown='1' hidden> 
**Full name:** DNA Data Bank of Japan  
**URL:** <https://www.ddbj.nig.ac.jp/>  
**FTP:** <https://ftp.ddbj.nig.ac.jp/ddbj_database/>  
**Scope:** nucleotide sequences, raw sequencing reads, functional genomics data 

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="ddbj-1" icon=false %}
<div id="ddbj-1" class="accordion_content" markdown='1' hidden>

- part of the International Nucleotide Sequence Database Collaboration (INSDC); daily data exchange with GenBank and ENA  
- accepts **sequence submissions** from Asia and worldwide (assembled & unassembled)  
- includes the DDBJ Sequence Read Archive **(DRA)** for raw NGS data  
- hosts **genome project metadata** and transcriptome data (Transcriptome Archive, **DTA**)  
- **identifiers:** accession numbers unified across INSDC partners (`DRA`, `DRR`, `DRX`, `DRS`)  
- **data formats:** `FASTA`, `FASTQ`, `GFF3` for annotations, XML metadata  

</div>

{% include accordion title="Applications" class=" " controls="ddbj-2" icon=false %}
<div id="ddbj-2" class="accordion_content" markdown='1' hidden>

- retrieve **Asian sequencing project data** not yet visible in GenBank/ENA portals  
- access raw reads through the **DRA** (mirrored to SRA/ENA)  
- explore functional genomics submissions (e.g., transcriptomes, metagenomes)  
- use as a **regional submission portal** for Japanese/Asian research projects  

</div>

{% include accordion title="Limitations" class=" " controls="ddbj-3" icon=false %}
<div id="ddbj-3" class="accordion_content" markdown='1' hidden>

- smaller user community outside Asia; documentation may lag behind ENA/NCBI  
- some tools/interfaces are **Japanese-language focused** (though English support exists)  
- like GenBank/ENA, contains **redundant or minimally annotated entries**  

</div>

{% include accordion title="Practical Tips" class=" " controls="ddbj-4" icon=false %}
<div id="ddbj-4" class="accordion_content" markdown='1' hidden>

- accession numbers (`DRA`, `DRR`, etc.) map directly to ENA/NCBI equivalents; useful for cross-referencing  
- check the **[DDBJ FTP site](http://ftp.ddbj.nig.ac.jp/ddbj_database/)** for bulk sequence and read datasets  
- prefer using **[ENA](#ena) or [NCBI](#genbank) mirrors** if bandwidth to Japan is slow  
- when possible, download processed/**curated versions** (e.g., [RefSeq](#refseq), [Ensembl](#ensembl)) instead of raw submissions  

</div>

{% include accordion title="CLI download" class=" " controls="ddbj-5" icon=false %}
<div id="ddbj-5" class="accordion_content" markdown='1' hidden>
Most of DDBJ content is synchronized with GenBank and ENA. Therefore, it's uncommon to download DDBJ in full, and users typically retrieve specific records as needed. 
Data from DDBJ can be accessed using `wget` or `curl` from the [DDBJ FTP](https://ddbj.nig.ac.jp/public/ddbj_database/), DRA Tools or SRA Toolkit for raw reads via the DRA, 
and programmatic access via Biopython. 

DDBJ FTP site: <https://ddbj.nig.ac.jp/public/ddbj_database/> ([README.TXT](https://ddbj.nig.ac.jp/public/ddbj_database/README.TXT))  

1. Download example record (FASTA):  
```bash
wget https://ddbj.nig.ac.jp/public/ddbj_database/ddbj/fasta/ddbjbct1.fasta.gz
```
2. Download raw reads from DRA (FASTQ):
```bash
wget https://ddbj.nig.ac.jp/public/ddbj_database/dra/fastq/DRA000/DRA000001/DRX000001/DRR000001.fastq.bz2
```
3. Fetch by accession (via NCBI EDirect, works cross-database):
```bash
esearch -db sra -query "DRR000001" | efetch -format runinfo > DRR000001.csv
```
</div>
</div>
</div>

<!-- RefSeq -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>RefSeq</h2><span style='font-weight: 300;'>(secondary) curated, non-redundant reference sequences (DNA, RNA, protein)</span>" class="outline" controls="db-seq-4" icon=false %}
<div id="db-seq-4" class="accordion_content" markdown='1' hidden> 
**Full name:** NCBI Reference Sequence Database  
**URL:** <https://www.ncbi.nlm.nih.gov/refseq/>  
**FTP:** <https://ftp.ncbi.nlm.nih.gov/refseq/> ([README](https://ftp.ncbi.nlm.nih.gov/refseq/README))  
**Scope:** curated, non-redundant reference sequences for genomes, transcripts, and proteins  

{% include alert class="tip" content="<b>RefSeq</b> differs from [GenBank](#genbank)/[ENA](#ena)/[DDBJ](#ddbj) in being curated and non-redundant - perfect for reference-based analysis." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="refseq-1" icon=false %}
<div id="refseq-1" class="accordion_content" markdown='1' hidden>

- **secondary database**: built by curating and annotating submissions from primary archives ([GenBank](#genbank)/[ENA](#ena)/[DDBJ](#ddbj))  
- provides non-redundant, stable **reference sequences**  
- covers DNA, RNA, and protein sequences for thousands of organisms  
- includes **genome assemblies** (reference), **transcript models**, and **protein products**  
- each entry is assigned a **stable RefSeq accession** (e.g., `NM_`, `NR_`, `NP_`, `NC_`)  
- annotations are **expert-curated**, regularly updated, and integrated with NCBI resources (e.g., Gene, [dbSNP](#dbsnp))  

</div>

{% include accordion title="Applications" class=" " controls="refseq-2" icon=false %}
<div id="refseq-2" class="accordion_content" markdown='1' hidden>

- use as **reference input** for read alignment, variant calling, and RNA-seq quantification  
- basis for **comparative genomics** and **functional annotation** pipelines  
- provides **stable identifiers** for reproducible reporting in publications  
- supports **protein functional analysis** (links to UniProt, Pfam, Gene Ontology) 

RefSeq is often used by tools such as:
- Prokka, funannotate, DRAM (genome annotation)
- BLAST databases: BLAST+, diamond (custom DBs from RefSeq protein FASTA)
- Kraken2, Kaiju (taxonomy-aware profiling)
- CheckM, GTDB-Tk, PhyloPhlAn (phylogenetics and quality control)
</div>

{% include accordion title="Limitations" class=" " controls="refseq-3" icon=false %}
<div id="refseq-3" class="accordion_content" markdown='1' hidden>

- narrower in scope than primary archives (does not include *all* submitted sequences)  
- update cycle may lag behind newest community submissions  
- curated annotations are **subject to revision**, so versions must be tracked (`.1`, `.2`, etc.)  

</div>

{% include accordion title="Practical Tips" class=" " controls="refseq-4" icon=false %}
<div id="refseq-4" class="accordion_content" markdown='1' hidden>

- cite **RefSeq accessions with version numbers** for reproducibility (`NM_000059.3`)  
- for human/mouse, RefSeq is closely coordinated with [GENCODE](#gencode)/[Ensembl]($ensembl) - check consistency  
- use RefSeq genomes/transcripts for **clinical pipelines** (e.g., FDA recommends RefSeq for diagnostic tools)  
- RefSeq integrates with **NCBI Gene**, providing quick navigation from gene IDs to sequence records  

</div>

{% include accordion title="CLI download" class=" " controls="refseq-5" icon=false %}
<div id="refseq-5" class="accordion_content" markdown='1' hidden>
Like [GenBank](#genbank), RefSeq is a large, curated database of genomic, transcript, and protein sequences maintained by NCBI. 
Due to its size, it’s not typical to download the entire resource. Instead, users typically retrieve specific genomes or sequences on demand using 
`ncbi-genome-download`, [Entrez Direct](https://www.ncbi.nlm.nih.gov/books/NBK179288/) (module `edirect`), `rsync` from NCBI FTP/Aspera or datasets CLI (`ncbi-datasets-pylib`).

RefSeq FTP site: <https://ftp.ncbi.nlm.nih.gov/refseq/>  

1. Download genome FASTA (human GRCh38):  
```bash
wget ftp://ftp.ncbi.nlm.nih.gov/refseq/H_sapiens/mRNA_Prot/human.*.rna.fna.gz
```
2. Download example bacterial proteins:
```bash
wget ftp://ftp.ncbi.nlm.nih.gov/refseq/release/bacteria/bacteria.1366.protein.faa.gz
```
3. Download by accession (via [NCBI EDirect]((https://www.ncbi.nlm.nih.gov/books/NBK179288/))):
```bash
module load edirect        
# or user-install if not available
sh -c "$(curl -fsSL https://ftp.ncbi.nlm.nih.gov/entrez/entrezdirect/install-edirect.sh)"
```
```bash
# Fetch RefSeq transcript by accession (FASTA)
esearch -db nucleotide -query "NM_001126112.2" | efetch -format fasta > BRCA2_transcript.fasta
# Fetch RefSeq protein record by accession
esearch -db protein -query "NP_000483.3" | efetch -format fasta > BRCA1_protein.fasta
```
</div>
</div>
</div>

<!-- miRBase -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>miRBase</h2><span style='font-weight: 300;'>(secondary) reference microRNA sequences, annotations, and nomenclature</span>" class="outline" controls="db-seq-5" icon=false %}
<div id="db-seq-5" class="accordion_content" markdown='1' hidden> 
**Full name:** miRBase – MicroRNA Sequence Database  
**URL:** <https://www.mirbase.org/>  
**FTP:** <https://www.mirbase.org/download/CURRENT/>  
**Scope:** central repository for published microRNA (miRNA) sequences and annotations, including nomenclature, genomic context, and predicted hairpin structures  

{% include alert class="tip" content="miRBase provides the **official naming and reference sequences** for miRNAs (e.g., `hsa-miR-21-5p`), widely used in small RNA-seq, target prediction, and functional studies." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="mirbase-1" icon=false %}
<div id="mirbase-1" class="accordion_content" markdown='1' hidden>

- includes both **precursor (hairpin)** and **mature** miRNA sequences  
- assigns stable accession IDs (e.g., `MI...` for precursors, `MIMAT...` for mature)  
- **covers over 270 species** including human, mouse, zebrafish, plants  
- annotations include genomic coordinates, sequence, structure, literature references  
- supports standardized naming: `hsa-`, `mmu-`, `dre-`, etc. for species prefixes  
- integrates with tools for miRNA target prediction and expression analysis  

</div>

{% include accordion title="Applications" class=" " controls="mirbase-2" icon=false %}
<div id="mirbase-2" class="accordion_content" markdown='1' hidden>

- annotate and quantify miRNAs from **small RNA-seq data**  
- identify **conserved or species-specific miRNAs** in functional studies  
- use in **target prediction pipelines** (e.g., TargetScan, miRanda)  
- explore miRNA roles in **cancer, development, immunity**, etc.  
- integrate with gene expression to infer **regulatory interactions**  

miRBase is used by many tools in miRNA discovery, quantification, or target prediction, such as: 
`bowtie` and `STAR`	(used for alignment to miRNA indices), `miRDeep2` (miRNA discovery and quantification), `miRge3.0` (miRNA alignment and expression), 
`sRNAbench` or `sRNAtoolbox` (small RNA profiling), `miranda` or `TargetScan` (target prediction using miRBase IDs).
</div>

{% include accordion title="Limitations" class=" " controls="mirbase-3" icon=false %}
<div id="mirbase-3" class="accordion_content" markdown='1' hidden>

- does not include **miRNA expression data** - only sequence and annotation  
- some entries are **predicted or low-confidence** (check supporting evidence)  
- updates may lag behind newly discovered miRNAs  
- overlapping or redundant names across species can cause confusion  
- no direct integration with clinical or disease-specific data (use [miRCancer](http://mircancer.ecu.edu), [HMDD](http://mircancer.ecu.edu))  

</div>

{% include accordion title="Practical Tips" class=" " controls="mirbase-4" icon=false %}
<div id="mirbase-4" class="accordion_content" markdown='1' hidden>

- always cite the **miRBase release version** (e.g., *miRBase v22.1*)  
- use species prefix (`hsa-`, `mmu-`, etc.) to avoid naming ambiguities  
- validate miRNA IDs using the [miRBase search](https://www.mirbase.org/search/)  
- download FASTA files for precursor/mature miRNAs for use in alignment tools (e.g., miRDeep2, sRNAbench)  
- use [miRBase FTP](https://www.mirbase.org/download/CURRENT/) for batch downloads or custom processing  

</div>

{% include accordion title="CLI download" class=" " controls="mirbase-5" icon=false %}
<div id="mirbase-5" class="accordion_content" markdown='1' hidden>
miRBase is a specialized database of microRNA (miRNA) sequences and annotations, widely used in transcriptomics and small RNA research. 
Because it is relatively small (~MBs rather than GBs), users commonly download it on demand or bundle it into pipelines manually.

miRBase FTP site: <https://www.mirbase.org/download/CURRENT/>  

1. Download all mature miRNA sequences (FASTA):
```bash
wget https://www.mirbase.org/download/CURRENT/mature_high_conf.fa
```
2. Download all precursor sequences:
```bash
wget https://www.mirbase.org/download/CURRENT/hairpin.fa
```
3. Download GFF annotation for human:
```bash
wget https://www.mirbase.org/download/hsa.gff3
```
4. Search for a specific miRNA (e.g., miR-21):
```bash
curl "https://www.mirbase.org/results/?query=miR-21"
```
</div>
</div>
</div>

</div>


### ➔ Genomes, Annotations

Beyond [raw sequence repositories](#sequence-databases), bioinformatics relies on resources that provide **reference genomes** 
and **structured annotations** of genes, transcripts, and genomic features. Databases such as [Ensembl](#ensembl), the [UCSC Genome Browser](#ucsc-genome-browser), 
and [GENCODE](#gencode) deliver curated gene models, coordinate systems, and visualization tools, forming the foundation for alignment, 
variant interpretation, and transcriptomic analysis. These resources ensure that analyses are anchored to well-defined, versioned reference assemblies and annotation sets.  

<div class="usa-accordion " >

<!-- Ensembl -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Ensembl</h2><span style='font-weight: 300;'>genome assemblies, gene models, variation</span>" class="outline" controls="genome-1" icon=false %}
<div id="genome-1" class="accordion_content" markdown='1' hidden> 
**Full name:** Ensembl Genome Browser  
**URL:** <https://www.ensembl.org/>  
**FTP:** <https://ftp.ensembl.org/pub/>  
**Scope:** provides reference genome assemblies, gene/transcript annotations, variation data, and comparative genomics resources for vertebrates and other species  

{% include alert class="tip" content="Ensembl IDs (`ENS...`) are **internal to Ensembl** and release-dependent, while [RefSeq](#refseq) accessions (`NM_`, `NP`, `NC_`) are cross-database stable references. Tools often support both, but you should keep track of which system your pipeline expects." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="ensembl-1" icon=false %}
<div id="ensembl-1" class="accordion_content" markdown='1' hidden>

- **secondary database**: uses primary archives (INSDC) to provide **curated annotations**  
- hosted data includes:  
  - **genome assemblies** (reference builds)  
  - **gene and transcript models**  
  - **variants** (SNPs, indels, structural variants)  
  - **comparative genomics resources** (orthologs, paralogs, synteny)  
- uses **stable identifiers**: genes (`ENSG...`), transcripts (`ENST...`), proteins (`ENSP...`)  
- integrates with [RefSeq](#refseq), [UniProt](#uniprot), [dbSNP](#dbsnp), [ClinVar](#clinvar), and other resources  
- browser interface allows visualization of genomic features in context  

</div>

{% include accordion title="Applications" class=" " controls="ensembl-2" icon=false %}
<div id="ensembl-2" class="accordion_content" markdown='1' hidden>

- widely used as the **reference gene annotation** in RNA-seq, variant calling, and GWAS  
- provides **orthology/paralogy** predictions for comparative genomics  
- access to **clinical variant databases** through Ensembl [VEP](https://useast.ensembl.org/info/docs/tools/vep/index.html) (Variant Effect Predictor)  
- programmatic access via Ensembl [REST API](https://rest.ensembl.org/) and [BioMart](http://useast.ensembl.org/biomart/martview/e03bf4380d6cb103e56668f87af7a074) for custom data retrieval  

Tools such as `STAR`, `HISAT2`, `featureCounts`, `HTSeq`, `kallisto`, `salmon`, `SnpEff`, and `VEP` 
commonly use Ensembl-provided genome FASTA and GTF/GFF annotation files for tasks like alignment, quantification, and variant effect prediction.
</div>

{% include accordion title="Limitations" class=" " controls="ensembl-3" icon=false %}
<div id="ensembl-3" class="accordion_content" markdown='1' hidden>

- updates are **release-based** (~2–3 months), annotations may differ between versions  
- identifiers are stable, but annotations linked to them can be revised  
- not all species are equally well-annotated (vertebrates most complete)  
- [GENCODE](#gencode) is the preferred annotation set for **human and mouse**, though Ensembl distributes it directly  

</div>

{% include accordion title="Practical Tips" class=" " controls="ensembl-4" icon=false %}
<div id="ensembl-4" class="accordion_content" markdown='1' hidden>

- cite the Ensembl release version in publications (e.g., *Ensembl release 111, 2024*)  
- use [BioMart](http://useast.ensembl.org/biomart/martview/e03bf4380d6cb103e56668f87af7a074) for quick exports of gene/transcript tables  
- Ensembl [REST API](https://rest.ensembl.org/) provides programmatic access to sequences, variants, annotations  
- for reproducibility: track both the **Ensembl release** and the **reference genome build**  

</div>

{% include accordion title="CLI download" class=" " controls="ensembl-5" icon=false %}
<div id="ensembl-5" class="accordion_content" markdown='1' hidden>
Ensembl provides genome assemblies, annotations, transcript/protein sequences, and gene models for a wide range of organisms, 
including both model and non-model species. Due to the size and organism-specific structure, it is typical to download only the species or data types needed for a given project.

Ensembl FTP site: <https://ftp.ensembl.org/pub/>  

1. Download genome FASTA (human GRCh38, release 111, 842M):  
```bash
wget ftp://ftp.ensembl.org/pub/release-111/fasta/homo_sapiens/dna/Homo_sapiens.GRCh38.dna.primary_assembly.fa.gz
```
2. Download GTF annotation file (human, release 111, 52M):
```bash
wget ftp://ftp.ensembl.org/pub/release-111/gtf/homo_sapiens/Homo_sapiens.GRCh38.111.gtf.gz
```
3. Programmatic access (REST API, example for BRCA2 gene, 85K):
```bash
curl "https://rest.ensembl.org/sequence/id/ENSG00000139618?content-type=text/x-fasta" -o BRCA2.fasta
```
</div>
</div>
</div>

<!-- UCSC Genome Browser -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>UCSC Genome Browser</h2><span style='font-weight: 300;'>genome assemblies, annotations, tracks</span>" class="outline" controls="genome-2" icon=false %}
<div id="genome-2" class="accordion_content" markdown='1' hidden> 
**Full name:** UCSC Genome Browser  
**URL:** <https://genome.ucsc.edu/>  
**FTP:** <https://hgdownload.soe.ucsc.edu/goldenPath/>  
**Scope:** interactive platform for visualizing reference genomes, annotations, and comparative genomics data  

{% include alert class="tip" content="Choose UCSC for **browsing and visualization**, integration, and coordinate conversion, using [utilities](https://genome.ucsc.edu/util.html): [Table Browser](https://genome.ucsc.edu/cgi-bin/hgTables), [BLAT](https://genome.ucsc.edu/cgi-bin/hgBlat), [LiftOver](https://genome.ucsc.edu/cgi-bin/hgLiftOver), [trackhub](https://daler.github.io/trackhub/). It uses the same underlying genome assemblies as Ensembl, but may differ in annotation sets and track organization. [Ensembl](#ensembl) is best for curated annotations and cross-species comparative genomics." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="ucsc-1" icon=false %}
<div id="ucsc-1" class="accordion_content" markdown='1' hidden>

- genome assemblies for many species (vertebrates, model organisms, some plants/fungi)  
- large collection of **annotation tracks**: genes, transcripts, repeats, conservation, epigenomics, variants  
- supports both **downloadable flat files** and interactive browsing  
- identifiers use standard genome builds (e.g., *hg19*, *hg38* for human)  
- tools: [Table Browser](https://genome.ucsc.edu/cgi-bin/hgTables), [BLAT](https://genome.ucsc.edu/cgi-bin/hgBlat) (fast alignment), [LiftOver](https://genome.ucsc.edu/cgi-bin/hgLiftOver) (coordinate conversion)  
- hosts [trackhub](https://daler.github.io/trackhub/) for community-provided datasets ([ENCODE](https://www.encodeproject.org), [GTEx](https://gtexportal.org/home/), etc.)  

</div>

{% include accordion title="Applications" class=" " controls="ucsc-2" icon=false %}
<div id="ucsc-2" class="accordion_content" markdown='1' hidden>

- visualize genome assemblies with layered annotation tracks  
- export **gene models**, **conservation scores**, **custom subsets** via the [Table Browser](https://genome.ucsc.edu/cgi-bin/hgTables) 
- align sequences to the genome using [BLAT](https://genome.ucsc.edu/cgi-bin/hgBlat) 
- convert genomic coordinates between builds using [LiftOver](https://genome.ucsc.edu/cgi-bin/hgLiftOver) 
- integrate external datasets as **custom tracks** or via [trackhub](https://daler.github.io/trackhub/)  

Tools such as `liftOver`, `bedtools`, genome browsers, and custom pipelines often rely on UCSC data formats 
(e.g., `.2bit`, `.bed`, `.wig`, `.bigWig`, `.gtf`) for genome analysis, annotation conversion, and coordinate mapping.
</div>

{% include accordion title="Limitations" class=" " controls="ucsc-3" icon=false %}
<div id="ucsc-3" class="accordion_content" markdown='1' hidden>

- most comprehensive for **human and model organisms**; some species have min. data  
- differences in annotation sets compared to [Ensembl](#ensembl) or [RefSeq](refseq) (reproducibility warning)  
- [LiftOver](https://genome.ucsc.edu/cgi-bin/hgLiftOver) requires chain files; not all regions map cleanly between builds  
- large flat files (e.g., `bigWig`, `bigBed`) may require specialized tools to manipulate  

</div>

{% include accordion title="Practical Tips" class=" " controls="ucsc-4" icon=false %}
<div id="ucsc-4" class="accordion_content" markdown='1' hidden>

- always note the **genome build version** (*hg19* vs *hg38*, *mm10* vs *mm39*, etc.)  
- use [Table Browser](https://genome.ucsc.edu/cgi-bin/hgTables)for batch downloads instead of manual track clicks  
- `bigWig` and `bigBed` files can be accessed programmatically and processed using UCSC’s [WiggleTools](https://github.com/Ensembl/WiggleTools) (combine, merge, scale, aggregate, etc.)
- for reproducibility, cite both the **genome build** and the **UCSC track version**  

</div>

{% include accordion title="CLI download" class=" " controls="ucsc-5" icon=false %}
<div id="ucsc-5" class="accordion_content" markdown='1' hidden>
Due to the breadth of data in UCSC, such as genome assemblies, annotations, and a wide range of track-based datasets 
(e.g., gene models, conservation, variants, epigenomics), users typically download specific tracks or species as needed.

UCSC FTP site: <ftp://hgdownload.soe.ucsc.edu/goldenPath/>  

1. Download human genome FASTA (`hg38`, 939M):  
```bash
wget ftp://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz
```
2. Download GTF annotation file (GENCODE genes ("knownGene" track) for `hg38`, 38M):
```bash
wget ftp://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/genes/hg38.knownGene.gtf.gz
```
3. Coordinate conversion with [LiftOver](https://genome.ucsc.edu/cgi-bin/hgLiftOver) (`hg19` to `hg38`):
```bash
# To lift genome annotations locally on Linux systems, download the LiftOver executable and the appropriate chain file. 
liftOver input_hg19.bed hg19ToHg38.over.chain.gz output_hg38.bed unMapped.bed
```
</div>
</div>
</div>

<!-- GENCODE -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>GENCODE</h2><span style='font-weight: 300;'>comprehensive gene & transcript annotations</span>" class="outline" controls="genome-3" icon=false %}
<div id="genome-3" class="accordion_content" markdown='1' hidden> 
**Full name:** GENCODE – The Reference Gene Annotation for Human and Mouse  
**URL:** <https://www.gencodegenes.org/>  
**FTP:** <https://ftp.ebi.ac.uk/pub/databases/gencode/>  
**Scope:** provides comprehensive, high-quality gene and transcript annotations for *Homo sapiens* and *Mus musculus*  

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="gencode-1" icon=false %}
<div id="gencode-1" class="accordion_content" markdown='1' hidden>

- **secondary annotation resource**, distributed through [Ensembl](#ensembl) and [UCSC](#ucsc-genome-browser)  
- combines **manual curation** (HAVANA group) and **automated annotation pipelines**  
- shared data includes:  
  - protein-coding genes, pseudogenes, long non-coding RNAs, small RNAs  
  - all known **transcript isoforms**  
- outputs in [GTF](/bioinformatics/resources/file_formats#gtf)/[GFF](/bioinformatics/resources/file_formats#gff) and [FASTA](/bioinformatics/resources/file_formats#fasta) formats (DNA, cDNA, protein sequences)  
- identifiers map to **Ensembl stable IDs** (e.g., `ENSG...`, `ENST...`)  
- the standard annotation set used in large-scale projects (e.g., [ENCODE](https://www.encodeproject.org), [GTEx](https://gtexportal.org/home/))  

</div>

{% include accordion title="Applications" class=" " controls="gencode-2" icon=false %}
<div id="gencode-2" class="accordion_content" markdown='1' hidden>

- the **default reference gene annotation** for human and mouse pipelines  
- used in RNA-seq alignment/quantification (e.g., STAR, Salmon, RSEM)  
- essential for **variant annotation** (via VEP, ANNOVAR)  
- widely applied in **transcriptomics, cancer genomics, and regulatory studies**  

GENCODE annotations are widely used by tools such as `STAR`, `HISAT2`, `kallisto`, `salmon`, `featureCounts`, `StringTie`, `SnpEff`, and `VEP` 
for read alignment, transcript quantification, and variant effect prediction, particularly in human and mouse transcriptomics.
</div>

{% include accordion title="Limitations" class=" " controls="gencode-3" icon=false %}
<div id="gencode-3" class="accordion_content" markdown='1' hidden>

- limited to **human and mouse** (other species rely on [Ensembl](#ensembl) or [RefSeq](#refseq))  
- annotations evolve: gene/transcript models can change between releases  
- large [GTF](/bioinformatics/resources/file_formats#gtf) files may be computationally heavy to parse  
- pipelines should always specify the **GENCODE release version** for reproducibility  

</div>

{% include accordion title="Practical Tips" class=" " controls="gencode-4" icon=false %}
<div id="gencode-4" class="accordion_content" markdown='1' hidden>

- always record the **GENCODE release version** (e.g., *GENCODE v43*)  
- human and mouse GENCODE are synchronized with [Ensembl](#ensembl) releases and available via [UCSC Genome Browser](#ucsc-genome-browser)  
- for reproducibility: match the GENCODE release with the **genome build** (e.g., `GRCh38`)  
- use [BioMart](http://useast.ensembl.org/biomart/martview/e03bf4380d6cb103e56668f87af7a074)/[Ensembl API](https://rest.ensembl.org/) for ID conversions between [Ensembl](#ensembl), [RefSeq](#refseq), GENCODE  

</div>

{% include accordion title="CLI download" class=" " controls="gencode-5" icon=false %}
<div id="gencode-5" class="accordion_content" markdown='1' hidden>
GENCODE provides high-quality, manually curated gene annotations (including protein-coding, lncRNA, and pseudogenes) for human (GRCh38, GRCh37) 
and mouse (GRCm39, GRCm38) genomes. It is a key reference for transcriptomic and genomic analysis and is often downloaded per project due to its focused organism coverage.

GENCODE FTP site: <ftp://ftp.ebi.ac.uk/pub/databases/gencode/>  

1. Download GTF annotation (human, v43, GRCh38, 48M):  
```bash
wget ftp://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_43/gencode.v43.annotation.gtf.gz
```
2. Download transcript FASTA (cDNA sequences, 79M):
```bash
wget ftp://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_43/gencode.v43.transcripts.fa.gz
```
3. Download protein FASTA (translated sequences, 12M):
```bash
wget ftp://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_43/gencode.v43.pc_translations.fa.gz
```
</div>
</div>
</div>

</div>


### ➔ Variant databases

To interpret genetic differences, researchers rely on databases that catalog **genomic variants** across populations and individuals. 
Core resources include [dbSNP](#dbsnp), [ClinVar](#clinvar), and the [1000 Genomes Project](https://www.internationalgenome.org), along with specialized databases 
such as [gnomAD](#gnomad) (population allele frequencies), [COSMIC](https://cancer.sanger.ac.uk/cosmic/login) (cancer mutations), and [HGMD](https://www.hgmd.cf.ac.uk/ac/index.php) (heritable disease mutations). 
These variant databases are essential for tasks such as calling variants from sequencing data, annotating their functional effects, 
and linking them to disease phenotypes or evolutionary patterns.  

<div class="usa-accordion " >

<!-- dbSNP -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>dbSNP</h2><span style='font-weight: 300;'>broad archive of SNPs and small variants, covering all organisms</span>" class="outline" controls="variant-1" icon=false %}
<div id="variant-1" class="accordion_content" markdown='1' hidden> 
**Full name:** dbSNP – Single Nucleotide Polymorphism Database  
**URL:** <https://www.ncbi.nlm.nih.gov/snp/>  
**FTP:** <https://ftp.ncbi.nih.gov/snp/>  
**Scope:** archival database of simple genetic polymorphisms (SNPs, indels, microsatellites, small structural variants) across species  

{% include alert class="tip" content="dbSNP IDs (`rs####`) are **persistent identifiers** used widely in literature, databases, and tools for referencing known variants. These IDs do not change across genome builds, but their coordinates may." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="dbsnp-1" icon=false %}
<div id="dbsnp-1" class="accordion_content" markdown='1' hidden>

- primary archive for **small variants**: SNPs, short insertions/deletions, microsatellites  
- includes variants from multiple sources: large-scale sequencing projects (e.g., [1000 Genomes](https://www.internationalgenome.org)), individual studies, submitters  
- supports **multiple organisms**, but human is most comprehensively annotated  
- assigns stable identifiers: Reference SNP cluster IDs, `rs...` 
- each record includes: alleles, flanking sequence, genomic context, submitter info, allele frequencies (when available)  
- integrates with [ClinVar](#clinvar), [RefSeq](#refseq), [Gene](https://www.ncbi.nlm.nih.gov/gene/), and [Genome](https://www.ncbi.nlm.nih.gov/genome/)  

</div>

{% include accordion title="Applications" class=" " controls="dbsnp-2" icon=false %}
<div id="dbsnp-2" class="accordion_content" markdown='1' hidden>

- provides **reference identifiers** for variants in tools and pipelines (e.g., `rs123456`)  
- used in **variant annotation** and **normalization**, often integrated into annotation tools (e.g., VEP, ANNOVAR)  
- enables **frequency-based filtering** and prioritization using population submissions (though less extensive than [gnomAD](#gnomad))  
- cross-referenced by most major bioinformatics tools and databases  

Tools like `GATK`, `bcftools`, `SnpEff`, `VEP`, and `ANNOVAR` use dbSNP data to annotate known variants, 
filter common SNPs, or compare against population frequencies in pipelines for variant calling and functional interpretation.
</div>

{% include accordion title="Limitations" class=" " controls="dbsnp-3" icon=false %}
<div id="dbsnp-3" class="accordion_content" markdown='1' hidden>

- includes **non-validated** or rare submitter-only variants (careful when interpreting)  
- **allele frequency** data may be missing or outdated for some entries  
- less suitable for **clinical interpretation** compared to [ClinVar](#clinvar)  
- coordinate representation can vary by genome build (check version, e.g., *GRCh38*)  
- variant context annotations may differ from more specialized databases  

</div>

{% include accordion title="Practical Tips" class=" " controls="dbsnp-4" icon=false %}
<div id="dbsnp-4" class="accordion_content" markdown='1' hidden>

- always cite `rs...` ID when referencing known SNPs in reports/publications  
- check the associated genome build (use dbSNP build version, e.g., *b155* for GRCh38)  
- use the [Variation Viewer](https://www.ncbi.nlm.nih.gov/variation/view/) for graphical variant exploration  
- for **batch retrieval**, use [Entrez E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/) or [dbSNP’s FTP](https://ftp.ncbi.nih.gov/snp/)  
- when matching variants from [VCF](/bioinformatics/resources/file_formats#vcf--bcf) files, confirm `rsID` and position match the target genome build  

</div>

{% include accordion title="CLI download" class=" " controls="dbsnp-5" icon=false %}
<div id="dbsnp-5" class="accordion_content" markdown='1' hidden>
Due to dbSNP size and continuous updates, it's typical to download only relevant subsets (e.g., specific chromosomes, organisms, or variant types) depending on the analysis.

dbSNP FTP site: <https://ftp.ncbi.nih.gov/snp/>  

1. Download human common SNPs in VCF format (dbSNP build 157, GRCh38):  **(WARNING: 28G)**
```bash
wget ftp://ftp.ncbi.nih.gov/snp/latest_release/VCF/GCF_000001405.40.gz
```
2. Download supporting files (`rsID` mappings, frequencies):
```bash
wget ftp://ftp.ncbi.nih.gov/snp/latest_release/JSON/refsnp-chr1.json.bz2 **(WARNING: 38G just for chromosome 1)**
```
3. Example query by `rsID` using [Entrez Direct](https://www.ncbi.nlm.nih.gov/books/NBK179288/) (fetch BRCA1 variant):
```bash
# returns a summary view of population frequencies, but not clinical significance, genomic context, or alleles
esearch -db snp -query "rs1799950" | efetch -format docsum > snp_rs1799950.docsum
```
For richer info, you can:
- Use `-format xml` or `-format json` for structured parsing.
- Try `-format docset` or `-format full` for more fields.
</div>
</div>
</div>

<!-- ClinVar -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>ClinVar</h2><span style='font-weight: 300;'>human variants with clinical interpretations, linking genotype to disease relevance</span>" class="outline" controls="variant-2" icon=false %}
<div id="variant-2" class="accordion_content" markdown='1' hidden> 
**Full name:** ClinVar – Clinical Variant Archive  
**URL:** <https://www.ncbi.nlm.nih.gov/clinvar/>  
**FTP:** <https://ftp.ncbi.nlm.nih.gov/pub/clinvar/>  
**Scope:** public archive of relationships between human genetic variants and phenotypes, with clinical interpretations submitted by diagnostic labs, researchers, and expert panels  

{% include alert class="tip" content="ClinVar provides **clinically relevant interpretations** of variants (e.g., `pathogenic`, `likely benign`), making it critical for genetic diagnostics, especially when interpreting results from clinical exome/genome sequencing." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="clinvar-1" icon=false %}
<div id="clinvar-1" class="accordion_content" markdown='1' hidden>

- **curated archive** for clinically relevant human genetic variants  
- submissions come from: clinical testing labs, academic researchers, expert panels
- variants include SNPs, indels, CNVs, and other structural changes  
- records include: variant type, genomic location, gene, clinical condition, submitter, interpretation, review status  
- each variant is linked to a **clinical significance assessment**: `pathogenic`, `likely pathogenic`, `benign`, `likely benign`, `uncertain significance` (VUS)  
- integrates with: [dbSNP](#dbsnp), [RefSeq](#refseq), [OMIM](https://omim.org/), [MedGen](https://www.ncbi.nlm.nih.gov/medgen/)  

</div>

{% include accordion title="Applications" class=" " controls="clinvar-2" icon=false %}
<div id="clinvar-2" class="accordion_content" markdown='1' hidden>

- used in clinical genetics, diagnostics, pharmacogenomics, and rare disease research  
- **variant annotation** (VEP, ANNOVAR, SnpEff) for predicting disease relevance  
- **clinical interpretation** of variants in patients through genome/exome sequencing  
- enables **gene-condition mapping**, e.g., BRCA1 → Breast Cancer  
- review of conflicting interpretations across multiple submitters 

Tools such as `VEP`, `SnpEff`, `ANNOVAR`, and `GATK` use ClinVar data to annotate, filter, or prioritize variants based on their known clinical significance, 
particularly in disease-related and diagnostic workflows. `IGV` and [UCSC Genome Browser](#ucsc-genome-browser) can be used to visualize ClinVar variants in genome.
</div>

{% include accordion title="Limitations" class=" " controls="clinvar-3" icon=false %}
<div id="clinvar-3" class="accordion_content" markdown='1' hidden>

- not all variants are present - depends on voluntary submission  
- **interpretations may conflict** among submitters (look for expert panel or review stars)  
- **incomplete coverage** of non-coding or regulatory variants
- may not reflect latest research / non-clinical evidence (check submission/review dates)  
- **VUS** designations can be ambiguous - not always actionable in clinical settings  

</div>

{% include accordion title="Practical Tips" class=" " controls="clinvar-4" icon=false %}
<div id="clinvar-4" class="accordion_content" markdown='1' hidden>

- use the **ClinVar accession ID** (`VCV#######`) when citing variants  
- prefer records with **2+ stars** and expert panel reviews for higher confidence  
- search variants by `rsID`, HGVS notation, or gene using the [ClinVar web interface](https://www.ncbi.nlm.nih.gov/clinvar/)  
- use [Variation Viewer](https://www.ncbi.nlm.nih.gov/variation/view/) for graphical browsing  
- programmatically access via [Entrez API](https://www.ncbi.nlm.nih.gov/home/develop/api/) or [ClinVar VCF files](https://ftp.ncbi.nlm.nih.gov/pub/clinvar/) for annotation pipelines  

</div>

{% include accordion title="CLI download" class=" " controls="clinvar-5" icon=false %}
<div id="clinvar-5" class="accordion_content" markdown='1' hidden>
ClinVar ocuses on clinically relevant variants, such as those linked to disease, and includes annotations like clinical significance, condition, review status, and allele origin. 
Due to frequent updates and large size, users usually download only the relevant subset (e.g., genome build, variant type, or condition) for their analysis.

ClinVar FTP site: <https://ftp.ncbi.nlm.nih.gov/pub/clinvar/>  

1. Download VCF for GRCh38 (latest release, 162M):
```bash
wget ftp://ftp.ncbi.nlm.nih.gov/pub/clinvar/vcf_GRCh38/clinvar.vcf.gz
```
2. Download summary table (tab-delimited, all submissions, 367M):
```bash
wget ftp://ftp.ncbi.nlm.nih.gov/pub/clinvar/tab_delimited/variant_summary.txt.gz
```
3. Get info for example `rs121913529` (CFTR pathogenic variant, 44K) via [Entrez Direct](https://www.ncbi.nlm.nih.gov/books/NBK179288/):
```bash
esearch -db clinvar -query "rs121913529" | efetch -format docsum
```
</div>
</div>
</div>

<!-- gnomAD -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>gnomAD</h2><span style='font-weight: 300;'>population-scale human variant frequencies, filtering rare from common variants</span>" class="outline" controls="variant-3" icon=false %}
<div id="variant-3" class="accordion_content" markdown='1' hidden> 
**Full name:** Genome Aggregation Database (gnomAD)  
**URL:** <https://gnomad.broadinstitute.org/>  
**FTP:** <https://gnomad.broadinstitute.org/downloads>  
**Scope:** compiles population-level frequencies of human genetic variants from exome and genome sequencing datasets, enabling rare/common variant filtering and allele frequency analysis  

{% include alert class="tip" content="gnomAD is essential for **distinguishing pathogenic from benign variants** based on population frequency - a variant common in healthy individuals is unlikely to be highly penetrant for rare Mendelian disease." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="gnomad-1" icon=false %}
<div id="gnomad-1" class="accordion_content" markdown='1' hidden>

- **aggregated variant dataset** from large-scale sequencing projects; versions:  
  - **gnomAD v2.1.1** (GRCh37, ~125k exomes + 15k genomes)  
  - **gnomAD v3.1.2** (GRCh38, ~76k genomes)  
- accessible data includes:  
  - allele frequencies across diverse populations  
  - variant consequences, filters, quality metrics  
  - homozygous counts, coverage data  
- annotations provided for: SNPs, indels, structural variants  
- integrates with tools like VEP and annotation pipelines  
- population groups: AFR, AMR, EAS, NFE, SAS, FIN, ASJ, etc.  

</div>

{% include accordion title="Applications" class=" " controls="gnomad-2" icon=false %}
<div id="gnomad-2" class="accordion_content" markdown='1' hidden>

- **filtering variants** based on allele frequency (e.g., exclude variants with `MAF > 1%`)  
- used in **rare disease** gene discovery and interpretation workflows  
- supports **variant prioritization** in WES/WGS pipelines  
- enables **population genetics**, constraint metrics (e.g., pLI, LOEUF)  
- used for **annotating VCFs** with population frequency data  

Tools such as `VEP`, `ANNOVAR`, `SnpEff`, and `bcftools` use gnomAD to annotate variants with allele frequencies across populations, 
helping to filter out common variants in rare disease and cancer studies.
</div>

{% include accordion title="Limitations" class=" " controls="gnomad-3" icon=false %}
<div id="gnomad-3" class="accordion_content" markdown='1' hidden>

- does **not include individuals with severe pediatric disease** (reduces pathogenic bias)  
- **frequency only** - no direct clinical significance annotations (unlike [ClinVar](#clinvar))  
- **coverage varies** across regions and populations  
- **versions differ** by genome build and cohort - use matching version for your reference  
- does not cover all populations equally (e.g., limited representation of certain groups)  

</div>

{% include accordion title="Practical Tips" class=" " controls="gnomad-4" icon=false %}
<div id="gnomad-4" class="accordion_content" markdown='1' hidden>

- use correct version: v2.1.1 for GRCh37 ; v3.1.2 for GRCh38  
- **match genome build** of your data before annotating with gnomAD  
- for rare disease studies, exclude variants with population frequency > 0.01 (1%)  
- use constraint scores (e.g., LOEUF < 0.35) to prioritize intolerant genes  
- explore variants interactively at [gnomad.broadinstitute.org](https://gnomad.broadinstitute.org)  
- annotation tools: VEP plugin for gnomAD, `bcftools` + `tabix` for local querying  

</div>

{% include accordion title="CLI download" class=" " controls="gnomad-5" icon=false %}
<div id="gnomad-5" class="accordion_content" markdown='1' hidden>
gnomAD download portal: <https://gnomad.broadinstitute.org/downloads>  

1. [Download gnomAD v4 VCF](https://gnomad.broadinstitute.org/downloads#v4) (XX GB)
2. Index the VCF for fast querying:
```bash
tabix -p vcf gnomad.genomes.v3.1.2.sites.chr1.vcf.bgz
```
3. Query example (get `rsID`, freq info for variant at `chr1:55516888`):
```bash
bcftools view -r 1:55516888 gnomad.genomes.v3.1.2.sites.chr1.vcf.bgz
```
</div>
</div>
</div>

</div>


### ➔ Gene Expression

Understanding **gene expression patterns** and functional responses is central to genomics research. Bioinformatics workflows rely on repositories that archive **raw and processed transcriptomic data**, 
capturing expression profiles across tissues, conditions, diseases, and treatments. Key public resources include the [Sequence Read Archive (SRA)](#sra) for primary sequencing reads, 
the [Gene Expression Omnibus (GEO)](#geo) for curated gene expression datasets, and [ArrayExpress](#arrayexpress) for microarray and RNA-seq data submissions with rich experimental metadata. 
These resources support downstream analyses such as differential expression, co-expression network inference, meta-analysis, and biomarker discovery. 

<div class="usa-accordion " >

<!-- SRA -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>SRA</h2><span style='font-weight: 300;'>(primary) repository of raw sequencing reads from transcriptomics and other studies</span>" class="outline" controls="expression-1" icon=false %}
<div id="expression-1" class="accordion_content" markdown='1' hidden> 
**Full name:** Sequence Read Archive (SRA)  
**URL:** <https://www.ncbi.nlm.nih.gov/sra>  
**FTP:** <https://ftp.ncbi.nlm.nih.gov/sra/>  
**Scope:** central repository for raw high-throughput sequencing data from [sequencing platforms](/bioinformatics/resources/sequencing#sequencing-technologies) like Illumina, PacBio, Oxford Nanopore; includes [assays](/bioinformatics/resources/sequencing#sequencing-assay-types) RNA-seq, ChIP-seq, WGS, and more  

{% include alert class="tip" content="SRA is a **primary archive** - it stores raw sequencing reads. <br>Use [GEO](#geo) or [ArrayExpress](#arrayexpress) for curated functional genomics datasets." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="sra-1" icon=false %}
<div id="sra-1" class="accordion_content" markdown='1' hidden>

- stores **raw sequencing data** from [next-gen sequencing (NGS) experiments](/bioinformatics/resources/sequencing)  
- includes RNA-seq, DNA-seq, metagenomics, ChIP-seq, ATAC-seq, etc.  
- structured by accessions: `SRP` (Project), `SRX` (Experiment), `SRS` (Sample), `SRR` (Run)  
- supports metadata on experiment design, sequencing platform, sample prep  
- part of the [INSDC](https://www.insdc.org/) with mirrored repositories at [ENA](#ena) (EMBL-EBI) and [DDBJ](#ddbj) (Japan)  
- integrates with [GEO](#geo) (via linked submissions) and *BioProject*/*BioSample*  

</div>

{% include accordion title="Applications" class=" " controls="sra-2" icon=false %}
<div id="sra-2" class="accordion_content" markdown='1' hidden>

- download **raw reads** for reanalysis, benchmarking, or new pipelines  
- search for RNA-seq data across tissues, diseases, organisms  
- use with tools like `fastq-dump`, `prefetch`, or via [sra-tools](https://github.com/ncbi/sra-tools)  
- source of data for training machine learning models or meta-analyses  
- used in pipelines for **de novo assembly**, **differential expression**, **variant calling**  

Tools such as `SRA Toolkit`, `fastq-dump`, `fasterq-dump`, `nf-core` pipelines, and Nextflow workflows rely on SRA data 
for downstream processing in RNA-seq, metagenomics, variant calling, and genome assembly pipelines.
</div>

{% include accordion title="Limitations" class=" " controls="sra-3" icon=false %}
<div id="sra-3" class="accordion_content" markdown='1' hidden>

- data is **unprocessed**: requires alignment, quantification, QC  
- metadata can be incomplete or inconsistent between submissions  
- **accessions are hierarchical** and can be confusing to navigate  
- large file sizes: high storage and compute costs for download/processing  
- annotations or condition labels are often minimal - cross-reference with [GEO](#geo)/*BioSample*  

</div>

{% include accordion title="Practical Tips" class=" " controls="sra-4" icon=false %}
<div id="sra-4" class="accordion_content" markdown='1' hidden>

- start with a **BioProject ID** to retrieve related experiments (`PRJNA...`)  
- use [NCBI SRA Run Selector](https://www.ncbi.nlm.nih.gov/Traces/study/) for tabular metadata download  
- download `SRR...` record with *sra-tools* (see **CLI download** below)
- combine with [GEO](#geo) or [ArrayExpress](#arrayexpress) for study design and sample annotation

</div>

{% include accordion title="CLI download" class=" " controls="sra-5" icon=false %}
<div id="sra-5" class="accordion_content" markdown='1' hidden> 
SRA is NCBI’s repository of raw sequencing data, including Illumina, Nanopore, PacBio, and other platform reads. Due to its massive size, 
it is never mirrored entirely, and users almost always download reads on demand using accession IDs (e.g., SRR123456).

SRA FTP portal: <https://ftp.ncbi.nlm.nih.gov/sra/>

1. Install sra-tools:
```bash
conda install -c bioconda sra-tools
```
2. Download SRA file and convert `.sra` (4.0M) to `.fastq` (8.5M x2) using *fasterq-dump* for speed:
```bash
prefetch SRR12345678          # downloads *.sra into a SRR12345678 folder 
fastq-dump --split-files SRR12345678/SRR12345678.sra
# or faster
fasterq-dump SRR12345678
```
3. Fetch metadata table (2.4K) from a study using [NCBI EDirect](https://www.ncbi.nlm.nih.gov/books/NBK179288/) (or download manually from https://www.ncbi.nlm.nih.gov/Traces/study/?acc=PRJNA600101):
```bash
esearch -db sra -query PRJNA600101 | efetch -format runinfo > PRJNA600101_runinfo.csv
```
</div>
</div>
</div>

<!-- GEO -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>GEO</h2><span style='font-weight: 300;'>curated archive of functional genomics data from microarrays and sequencing</span>" class="outline" controls="expression-2" icon=false %}
<div id="expression-2" class="accordion_content" markdown='1' hidden> 
**Full name:** Gene Expression Omnibus (GEO)  
**URL:** <https://www.ncbi.nlm.nih.gov/geo/>  
**FTP:** <https://ftp.ncbi.nlm.nih.gov/geo/>  
**Scope:** public functional genomics data repository supporting MIAME-compliant submissions from microarray and sequencing platforms, including RNA-seq, ChIP-seq, and expression profiling  

{% include alert class="tip" content="GEO provides both **processed data** (e.g., expression matrices) and links to **raw data** hosted in [SRA](#sra). It's ideal for reanalysis and method benchmarking." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="geo-1" icon=false %}
<div id="geo-1" class="accordion_content" markdown='1' hidden>

- includes data from **microarrays**, **RNA-seq**, **ChIP-seq**, **methylation**, etc.  
- structured by accessions: `GSE` (Series), `GSM` (Sample), `GPL` (Platform)  
- often linked to raw [FASTQ](/bioinformatics/resources/file_formats#fastq)/[BAM](/bioinformatics/resources/file_formats#sam--bam--cram) files in [SRA](#sra)  
- submission includes metadata (organism, experimental design, conditions, protocols)  
- supports user-submitted supplementary files, processed matrices, and figures  
- curated collections available via [GEO DataSets](https://www.ncbi.nlm.nih.gov/geo/info/datasets.html) and [GEO Profiles](https://www.ncbi.nlm.nih.gov/geo/info/profiles.html)  

</div>

{% include accordion title="Applications" class=" " controls="geo-2" icon=false %}
<div id="geo-2" class="accordion_content" markdown='1' hidden>

- download processed **expression matrices** for reanalysis or machine learning  
- search for relevant studies across diseases, tissues, conditions  
- use [GEO2R](https://www.ncbi.nlm.nih.gov/geo/info/geo2r.html) for online differential expression analysis  
- training/testing datasets for **biomarker discovery**, **clustering**, **classification**  
- track data reuse or replicate findings across studies  

Tools such as `limma`, `DESeq2`, `edgeR`, `GEOquery`, and `ArrayExpress` rely on GEO for expression profiling, differential expression analysis, and benchmark datasets.
</div>

{% include accordion title="Limitations" class=" " controls="geo-3" icon=false %}
<div id="geo-3" class="accordion_content" markdown='1' hidden>

- metadata heterogeneity: free-text fields can complicate automated parsing  
- platform diversity (especially in older microarray data) requires normalization  
- raw data may be missing or only partially available for some studies  
- varying file formats (TXT, CSV, [SOFT](https://www.ncbi.nlm.nih.gov/geo/info/soft.html), [MINiML](https://www.ncbi.nlm.nih.gov/geo/info/MINiML.html)) may need manual parsing  
- annotation consistency depends on submitter quality  

</div>

{% include accordion title="Practical Tips" class=" " controls="geo-4" icon=false %}
<div id="geo-4" class="accordion_content" markdown='1' hidden>

- use [GEO DataSets](https://www.ncbi.nlm.nih.gov/gds) for keyword-based study searches  
- inspect metadata using the **Series Matrix File** or [SOFT](https://www.ncbi.nlm.nih.gov/geo/info/soft.html)/[MINiML](https://www.ncbi.nlm.nih.gov/geo/info/MINiML.html) formats  
- for quick analysis, try [GEO2R](https://www.ncbi.nlm.nih.gov/geo/info/geo2r.html) (web-based DE analysis tool)  
- download with `wget` or via [GEOquery](https://bioconductor.org/packages/release/bioc/html/GEOquery.html) (R/Bioconductor)  
- check if raw data is linked to [SRA](#sra) under the `SRA` tab of a study  

{% include alert class="" content="A **Series Matrix File** is a processed, tab-delimited file from GEO that contains normalized gene expression data along with sample annotations for a given study (GSE), making it suitable for downstream analysis." %}

</div>

{% include accordion title="CLI download" class=" " controls="geo-5" icon=false %}
<div id="geo-5" class="accordion_content" markdown='1' hidden>
GEO is NCBI’s public repository for gene expression, epigenomics, and other functional genomics data, including microarray and RNA-seq datasets. 
Because studies vary widely in size and content, GEO is usually accessed on-demand, either interactively or programmatically.

GEO FTP site: <https://ftp.ncbi.nlm.nih.gov/geo/>  

1. Download Series Matrix File (e.g., `GSE22255`, 7.2M):
```bash
wget ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE22nnn/GSE22255/matrix/GSE22255_series_matrix.txt.gz
```
2. Download raw data archive (317M):
```bash
wget ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE22nnn/GSE22255/suppl/GSE22255_RAW.tar
```
3. Download GEO data using [NCBI EDirect](https://www.ncbi.nlm.nih.gov/books/NBK179288/) (78K) 
```bash
esearch -db gds -query "GSE22255" | efetch -format docsum
```
4. Download GEO data using `GEOquery` in **R**:
```r
library(GEOquery)
gse <- getGEO("GSE22255", GSEMatrix = TRUE)
exprs(gse[[1]])
```
</div>
</div>
</div>

<!-- ArrayExpress -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>ArrayExpress</h2><span style='font-weight: 300;'>functional genomics data, focusing on experimental metadata and reusability</span>" class="outline" controls="expression-3" icon=false %}
<div id="expression-3" class="accordion_content" markdown='1' hidden> 
**Full name:** ArrayExpress – Functional Genomics Data Archive  
**URL:** <https://www.ebi.ac.uk/arrayexpress/>  
**FTP:** <https://ftp.ebi.ac.uk/pub/databases/arrayexpress/>  
**Scope:** archive of functional genomics experiments, including microarrays and RNA-seq, with rich experimental metadata and curated sample annotations  

{% include alert class="tip" content="ArrayExpress emphasizes **metadata quality and reusability**, and is especially strong for studies with detailed experimental designs. Most RNA-seq data is now routed to [BioStudies](https://www.ebi.ac.uk/biostudies/) but legacy data remains accessible." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="arrayexpress-1" icon=false %}
<div id="arrayexpress-1" class="accordion_content" markdown='1' hidden>

- supports both **microarray** and **RNA-seq** data submissions  
- structured with accession format `E-MTAB-####`, `E-GEOD-####` (GEO imports), etc.  
- includes sample annotations, experimental variables, factor values, protocols  
- many datasets are linked to publications and supplementary materials  
- integrates with [Ensembl](#ensembl), [Expression Atlas](https://www.ebi.ac.uk/gxa/home), and [BioStudies](https://www.ebi.ac.uk/biostudies/)  
- maintained by EMBL-EBI and part of the ELIXIR infrastructure  

</div>

{% include accordion title="Applications" class=" " controls="arrayexpress-2" icon=false %}
<div id="arrayexpress-2" class="accordion_content" markdown='1' hidden>

- download **quantified expression matrices** and sample annotations  
- reuse curated datasets for **meta-analysis**, **differential expression**, **biomarker discovery**  
- explore expression profiles across species, conditions, and platforms  
- use sample annotations to build supervised learning models  
- useful for testing analysis pipelines or validating hypotheses  

Tools such as `limma`, `edgeR`, `DESeq2`, and `ExpressionAtlas` workflows use ArrayExpress data for 
expression analysis, benchmarking, and data reprocessing, especially in multi-species or microarray studies.
</div>

{% include accordion title="Limitations" class=" " controls="arrayexpress-3" icon=false %}
<div id="arrayexpress-3" class="accordion_content" markdown='1' hidden>

- newer RNA-seq submissions may redirect to [BioStudies](https://www.ebi.ac.uk/biostudies/)  
- microarray technologies dominate historical data (may not reflect current methods)  
- platform heterogeneity requires preprocessing for cross-study comparison  
- not all studies include raw [FASTQ](/bioinformatics/resources/file_formats#fastq) files (many include only processed data)  
- metadata quality varies between submitters  

</div>

{% include accordion title="Practical Tips" class=" " controls="arrayexpress-4" icon=false %}
<div id="arrayexpress-4" class="accordion_content" markdown='1' hidden>

- use the [ArrayExpress Advanced Search](https://www.ebi.ac.uk/arrayexpress/) to filter by organism, assay type, or experimental factor  
- browse [Expression Atlas](https://www.ebi.ac.uk/gxa/home) for baseline and differential expression summaries  
- access sample metadata via `idf` (investigation) and `sdrf` (sample) files  
- download processed data matrices or raw files using FTP or direct links  
- cross-reference accession numbers (`E-GEOD-####`) with GEO if needed  

</div>

{% include accordion title="CLI download" class=" " controls="arrayexpress-5" icon=false %}
<div id="arrayexpress-5" class="accordion_content" markdown='1' hidden>
ArrayExpress is EMBL-EBI's functional genomics archive, similar to [GEO](#geo), and includes transcriptomics, epigenetics, and proteomics datasets from microarrays and RNA-seq. 
Since it's tightly integrated with BioStudies and [ENA](#ena), users typically download only the specific studies they need.

ArrayExpress FTP site: <https://ftp.ebi.ac.uk/pub/databases/arrayexpress/>  

1. Download metadata (13K) and processed data (3.5M) for Arabidopsis thaliana *E-MTAB-2836*:
```bash
wget ftp://ftp.ebi.ac.uk/pub/databases/arrayexpress/data/experiment/MTAB/E-MTAB-2835/E-MTAB-2835.sdrf.txt
wget ftp://ftp.ebi.ac.uk/pub/databases/arrayexpress/data/experiment/MTAB/E-MTAB-2835/E-MTAB-2835.processed.1.zip
```
2. Access raw files if available:
```bash
wget ftp://ftp.ebi.ac.uk/pub/databases/arrayexpress/data/experiment/MTAB/E-MTAB-2835/E-MTAB-2835.raw.1.zip
```
</div>
</div>
</div>

</div>

### ➔ Functional enrichment

To interpret large gene or protein lists from high-throughput experiments, bioinformatics relies on resources that capture biological meaning through structured vocabularies and curated pathways. 
**Functional enrichment analysis** enables researchers to connect differential expression, variant impact, or proteomic profiles to known **biological processes**, **molecular functions**, and **pathways**. 
Key resources in this space include the [Gene Ontology (GO)](#gene-ontology-go) for standardized function classification, [KEGG](#kegg) for curated maps of metabolic and signaling pathways, 
and [Reactome](#reactome) for expert-reviewed molecular interaction networks. These databases power enrichment tools (e.g., GSEA, DAVID, clusterProfiler) 
and support systems-level interpretations of omics data across species and contexts.

<div class="usa-accordion " >

<!-- Gene Ontology -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Gene Ontology (GO)</h2><span style='font-weight: 300;'>structured ontology, standardized functional terms for genes</span>" class="outline" controls="functional-1" icon=false %}
<div id="functional-1" class="accordion_content" markdown='1' hidden> 
**Full name:** Gene Ontology (GO)  
**URL:** <http://geneontology.org/>  
**FTP:** <http://current.geneontology.org/ontology/>  
**Scope:** provides a controlled vocabulary for describing gene and gene product function in terms of biological process, molecular function, and cellular component across all species  

{% include alert class="tip" content="GO terms (e.g., `GO:0006915` for apoptosis) allow **functional annotation and enrichment analysis** of gene sets in a standardized, species-agnostic framework." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="go-1" icon=false %}
<div id="go-1" class="accordion_content" markdown='1' hidden>

- composed of three ontologies:  
  - **Biological Process (BP)** – pathways and processes (e.g., cell cycle, apoptosis)  
  - **Molecular Function (MF)** – activities at the molecular level (e.g., kinase activity)  
  - **Cellular Component (CC)** – locations (e.g., nucleus, mitochondrion)  
- terms are organized hierarchically (parent-child relationships)  
- used for annotating genes in model organisms and humans  
- GO annotations link gene products to GO terms via evidence codes (e.g., EXP, IEA, TAS)  
- maintained by the [Gene Ontology Consortium](https://geneontology.org); updated regularly  

</div>

{% include accordion title="Applications" class=" " controls="go-2" icon=false %}
<div id="go-2" class="accordion_content" markdown='1' hidden>

- perform **functional enrichment analysis** on differentially expressed genes  
- annotate genes and proteins with standardized functional descriptors  
- used in pathway, systems biology, and gene set analysis pipelines  
- integrated in tools like DAVID, PANTHER, g:Profiler, clusterProfiler  
- supports **cross-species comparisons** of gene function  

GO is used by tools such as `topGO`, `clusterProfiler`, `GSEA`, `PANTHER`, `Blast2GO`, and `InterProScan` 
for functional enrichment analysis, annotation, and pathway interpretation in gene expression and proteomics workflows.
</div>

{% include accordion title="Limitations" class=" " controls="go-3" icon=false %}
<div id="go-3" class="accordion_content" markdown='1' hidden>

- annotations vary by organism and database (some are inferred electronically)  
- broad or generic terms may dilute biological specificity  
- dynamic processes or context-specific functions are not always fully captured  
- requires gene ID conversion to GO-compatible formats (e.g., Entrez, [Ensembl](#ensembl))  
- redundancy or hierarchy in terms can inflate enrichment significance (use proper background sets)  

</div>

{% include accordion title="Practical Tips" class=" " controls="go-4" icon=false %}
<div id="go-4" class="accordion_content" markdown='1' hidden>

- use [AmiGO 2](http://amigo.geneontology.org/amigo) to browse GO terms and annotations  
- use R packages (`clusterProfiler`, `topGO`, `GSEABase`) for enrichment in pipelines  
- always check the **evidence code** for annotations (e.g., experimental vs predicted)  
- match GO annotations to your genome build/version (e.g., [Ensembl](#ensembl) release)  
- avoid interpreting enrichment solely by `p-value`; check term specificity & gene overlap  

</div>

{% include accordion title="CLI download" class=" " controls="go-5" icon=false %}
<div id="go-5" class="accordion_content" markdown='1' hidden>
The Gene Ontology includes both the GO term hierarchy (ontology) and gene–GO annotations for many species. 
Due to frequent updates and moderate size, it is common to download GO data on demand, or access it through tools and libraries.

GO FTP site: <http://current.geneontology.org/ontology/>  

1. Download the ontology file (`OBO` format, 30M):
```bash
wget http://current.geneontology.org/ontology/go-basic.obo
```
2. Download gene-to-GO annotations (e.g., human from Ensembl, 15M):
```bash
wget http://current.geneontology.org/annotations/goa_human.gaf.gz
```
3. Search for an example GO term (e.g., apoptosis):
```bash
curl https://www.ebi.ac.uk/QuickGO/services/ontology/go/terms/GO:0006915
```
4. Use Ensembl [BioMart](http://useast.ensembl.org/biomart/martview/e03bf4380d6cb103e56668f87af7a074) or [UniProt](#uniprot) mapping tools to convert to Entrez/UniProt for GO analysis.
</div>
</div>
</div>

<!-- KEGG -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>KEGG</h2><span style='font-weight: 300;'>broader biochemical molecular pathways, metabolism, diseases, and drugss</span>" class="outline" controls="functional-2" icon=false %}
<div id="functional-2" class="accordion_content" markdown='1' hidden> 
**Full name:** KEGG – Kyoto Encyclopedia of Genes and Genomes  
**URL:** <https://www.genome.jp/kegg/>  
**FTP:** <https://www.kegg.jp/kegg/download/> (Academic Subscription required)  
**GenomeNet FTP:** <https://www.genome.jp/en/gn_ftp.html> (subset of KEGG MEDICUS is freely available)  
**Scope:** curated resource integrating genomic, chemical, and functional information into pathway maps for metabolism, signaling, disease, and drug discovery  

{% include alert class="tip" content="KEGG pathways are widely used for **functional enrichment**, **metabolic modeling**, and **drug-target network analysis**, especially in human and microbial genomics." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="kegg-1" icon=false %}
<div id="kegg-1" class="accordion_content" markdown='1' hidden>

- includes manually drawn **pathway maps** for metabolism, signaling, cellular processes  
- integrates genes, proteins, metabolites, drugs, and diseases into functional modules  
- organisms are assigned **KEGG organism codes** (e.g., `hsa` for human, `eco` for *E. coli*)  
- available data includes:  
  - **KEGG PATHWAY** – metabolic/signaling maps  
  - **KEGG ORTHOLOGY (KO)** – gene function classification  
  - **KEGG DRUG/DISEASE** – pharmacological and medical annotations  
- supports **KGML** (KEGG Markup Language) for pathway data exchange  
- links to [Ensembl](#ensembl), [UniProt](#uniprot), [NCBI Gene](https://www.ncbi.nlm.nih.gov/gene/), and [PubChem](https://pubchem.ncbi.nlm.nih.gov)  

</div>

{% include accordion title="Applications" class=" " controls="kegg-2" icon=false %}
<div id="kegg-2" class="accordion_content" markdown='1' hidden>

- **pathway enrichment analysis** of gene lists (via tools like DAVID, clusterProfiler)  
- mapping differentially expressed genes or proteins onto known networks  
- **metabolic reconstruction** in microbial genomics and synthetic biology  
- used in **drug-target interaction prediction** and **disease mechanism studies**  
- visual interpretation of omics data via `pathview` or [KEGG Mapper](https://www.genome.jp/kegg/mapper/)  

Tools such as `ClusterProfiler`, `eggNOG-mapper`, `KAAS`, `BlastKOALA`, `KEGG Mapper`, and `Pathview` use KEGG 
for functional annotation, KO assignments, and pathway enrichment analysis, especially in transcriptomics and metagenomics workflows.
</div>

{% include accordion title="Limitations" class=" " controls="kegg-3" icon=false %}
<div id="kegg-3" class="accordion_content" markdown='1' hidden>

- full API and bulk access requires **subscription for academic or commercial use**  
- updates may lag for some species or newer gene models  
- metabolic maps are **static diagrams** and lack temporal/dynamic information  
- data structure is less ontology-driven than [Reactome](#reactome) or [BioCyc](https://biocyc.org)  
- pathway boundaries are human-defined and may not reflect actual modularity  

</div>

{% include accordion title="Practical Tips" class=" " controls="kegg-4" icon=false %}
<div id="kegg-4" class="accordion_content" markdown='1' hidden>

- convert gene IDs to KEGG orthologs (`K numbers`) for cross-species analysis  
- use [KEGG Mapper](https://www.genome.jp/kegg/mapper/) for gene list overlay  
- combine KEGG with tools like [clusterProfiler](https://bioconductor.org/packages/release/bioc/html/clusterProfiler.html) or [GSEA](https://www.gsea-msigdb.org/)  
- for visualization in R use: `pathview`, `gage`, `KEGGREST`  
- cite the **KEGG release number** or date when using specific pathway data  

</div>

{% include accordion title="CLI download" class=" " controls="kegg-5" icon=false %}
<div id="kegg-5" class="accordion_content" markdown='1' hidden>
KEGG is a widely used resource for pathway mapping, gene function, metabolism, and molecular interaction networks. 
Due to licensing restrictions and size, KEGG is typically accessed on demand via APIs.

KEGG FTP site: <https://www.kegg.jp/kegg/download/> *(Academic Subscription required)* 

{% include alert class="tip" content="If you don’t have a KEGG subscription, you can still perform KEGG pathway analysis using tools like **clusterProfiler**, which access KEGG data through the public REST API. 
This approach avoids manual downloads and provides seamless integration with gene lists for enrichment analysis." %}

1. Run clusterProfiler in R environment:
```r
library(clusterProfiler)
library(org.Hs.eg.db)

# Gene list (Entrez IDs required for KEGG)
gene_list <- c("7157", "5290", "1956", "673")  # Example

# KEGG enrichment
kegg_enrich <- enrichKEGG(gene = gene_list, organism = "hsa")

# Make results readable (map Entrez → gene symbols)
kegg_enrich <- setReadable(kegg_enrich, OrgDb = org.Hs.eg.db, keyType = "ENTREZID")

# View top pathways
head(kegg_enrich)

# Plot
barplot(kegg_enrich, showCategory = 10)
```
This approach:
- works without a subscription
- automatically queries KEGG REST API
- downloads only what's needed
- integrates directly with your data and downstream plotting
</div>
</div>
</div>


<!-- Reactome -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Reactome</h2><span style='font-weight: 300;'>curated pathway database for molecular signaling and reaction networks</span>" class="outline" controls="functional-3" icon=false %}
<div id="functional-3" class="accordion_content" markdown='1' hidden> 
**Full name:** Reactome – Open-source Pathway Knowledgebase  
**URL:** <https://reactome.org/>  
**FTP:** <https://reactome.org/download-data>  
**Scope:** peer-reviewed, ontology-driven resource of molecular pathways and reactions, primarily for humans, with orthology-based projections to other species  

{% include alert class="tip" content="Reactome is ideal for **systems biology**, offering richly annotated and **hierarchically organized pathways** suitable for network modeling and computational analyses." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="reactome-1" icon=false %}
<div id="reactome-1" class="accordion_content" markdown='1' hidden>

- covers molecular signaling, transport, metabolism, cell cycle, disease pathways
- **curated by domain experts** and updated regularly with literature-backed evidence  
- pathways are structured as **reaction networks**, capturing inputs, outputs, catalysts, and regulators  
- integrates with [UniProt](#uniprot), [Ensembl](#ensembl), Gene Ontology (GO), [ChEBI](https://www.ebi.ac.uk/chebi/), [PubMed](https://pubmed.ncbi.nlm.nih.gov)  
- supports multiple formats: BioPAX, SBML, PSI-MITAB, and JSON  
- orthology mappings allow pathway projection to model organisms (mouse, fly, worm)  

</div>

{% include accordion title="Applications" class=" " controls="reactome-2" icon=false %}
<div id="reactome-2" class="accordion_content" markdown='1' hidden>

- perform **pathway enrichment** on gene/protein lists (overrepresentation or [GSEA](https://www.gsea-msigdb.org/)-style)  
- visualize complex networks using the [Reactome Pathway Browser](https://reactome.org/PathwayBrowser)  
- model **molecular mechanisms** for disease or drug effects  
- integrate into **multi-omics pipelines** (genomics, proteomics, phosphoproteomics)  
- export pathway data for **simulation**, **knowledge graphs**, or **network propagation**  

Reactome data is supported by tools such as `clusterProfiler` via `enrichPathway()`, `ReactomePA` (R/Bioconductor package dedicated to Reactome), `GSEA`, `Cytoscape` & `ReactomeFI`, and `Pathview`. 
</div>

{% include accordion title="Limitations" class=" " controls="reactome-3" icon=false %}
<div id="reactome-3" class="accordion_content" markdown='1' hidden>

- pathway coverage is **most complete for human**; projections to other species are computational  
- focuses on **manually verified biology**; novel/speculative interactions may be excluded  
- some pathways (e.g., microbial metabolism) are less represented than in [KEGG](#kegg)  
- visualization may be overwhelming for very large or nested pathways  
- clinical annotation is limited (use in conjunction with DisGeNET or OpenTargets)  

</div>

{% include accordion title="Practical Tips" class=" " controls="reactome-4" icon=false %}
<div id="reactome-4" class="accordion_content" markdown='1' hidden>

- use [Reactome Analysis Service](https://reactome.org/PathwayBrowser/#TOOL=AT) to run enrichment on gene lists  
- for R/Bioconductor pipelines, use the `ReactomePA` or `reactome.db` packages  
- each pathway has a **stable ID** (e.g., `R-HSA-199420`) - document this in reports  
- export diagrams and reaction networks via the [Pathway Browser](https://reactome.org/PathwayBrowser)  interface  
- use the [REST API](https://reactome.org/ContentService/) for advanced queries  

</div>

{% include accordion title="CLI download" class=" " controls="reactome-5" icon=false %}
<div id="reactome-5" class="accordion_content" markdown='1' hidden>
Reactome is a manually curated, open-access pathway database that covers human biology and inferred pathways for many other species. 
Unlike KEGG, it is fully open and regularly updated, making it easy to access programmatically or through R packages for enrichment analysis.

Reactome download portal: <https://reactome.org/download-data>  

1. Download pathway hierarchy (1.5M) and mappings (608K):
```bash
wget https://reactome.org/download/current/ReactomePathways.txt
wget https://reactome.org/download/current/ReactomePathwaysRelation.txt
```
2. Download gene-to-pathway mappings (human, 153M):
```bash
wget https://reactome.org/download/current/Ensembl2Reactome.txt
```
3. Access pathway in BioPAX format (161M). This includes the `.owl` (BioPAX level 3) files for all included species.
```bash
wget https://reactome.org/download/current/biopax.zip
```
4. Query [pathway](https://reactome.org/ContentService/#/pathways) (and many other categories) info using [ContentService](https://reactome.org/ContentService/):
```bash
curl -X 'GET' 'https://reactome.org/ContentService/data/pathway/R-HSA-5673001/containedEvents' -H 'accept: */*'
```
</div>
</div>
</div>

</div>

### ➔ Protein databases

Protein-focused bioinformatics resources provide reference data for studying **sequence**, **structure**, and **function** of proteins and their interactions. 
These databases are critical for tasks such as **functional annotation**, **variant interpretation**, **protein modeling**, and **structure-based drug discovery**. 
[UniProt](#uniprot) offers a comprehensive, curated catalog of protein sequences, isoforms, domains, and functional annotations across species, 
integrating experimental and predicted data. The [Protein Data Bank (PDB)](#pdb) archives experimentally determined 3D structures of proteins, DNA/RNA, and complexes, 
enabling structural biology, docking studies, and mechanistic modeling of molecular function.

<div class="usa-accordion " >

<!-- UniProt -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>UniProt</h2><span style='font-weight: 300;'>(secondary) protein sequences and functional annotations; Swiss-Prot and TrEMBL</span>" class="outline" controls="special-2" icon=false %}
<div id="special-2" class="accordion_content" markdown='1' hidden> 
**Full name:** Universal Protein Resource  
**URL:** <https://www.uniprot.org/>  
**FTP:** <https://ftp.uniprot.org/pub/databases/uniprot/>  
**Scope:** comprehensive protein sequence and annotation database  

{% include alert class="tip" content="**Swiss-Prot** (curated) accessions usually start with `P`, `Q`, or `O` (e.g., *P38398*, *Q96H15*, *O43521*). **TrEMBL** (unreviewed) accessions can begin with other letters/numbers and often look less consistent. Each record also has a **stable UniProtKB ID** (e.g., *RAD51_HUMAN*) in addition to the accession. <br>*Always prefer Swiss-Prot when available - annotations are manually verified.* " %}


<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="uniprot-1" icon=false %}
<div id="uniprot-1" class="accordion_content" markdown='1' hidden>

- **secondary database**: integrates sequences from primary sources ([GenBank](#genbank), [ENA](#ena), [DDBJ](#ddbj), [RefSeq](#refseq))  
- provides two main components:  
  - **Swiss-Prot**: manually curated, high-quality annotations  
  - **TrEMBL**: computationally annotated, automatically generated records  
- each entry assigned a **stable UniProt accession** (e.g., `P38398`)  
- provides extensive **functional annotations**: domains, PTMs, pathways, interactions  
- integrates with **[PDB](#pdb) (structures)**, **Gene Ontology**, and pathway databases (e.g., [Reactome](#reactome))  

</div>

{% include accordion title="Applications" class=" " controls="uniprot-2" icon=false %}
<div id="uniprot-2" class="accordion_content" markdown='1' hidden>

- reference protein sequences for **functional genomics** and **proteomics**  
- annotation source for **homology searches**, **domain analysis**, and **pathway mapping**  
- links proteins to **genetic variants** (via UniProtKB/Var)  
- supports **systems biology** workflows by integrating with structure and pathway data  

Tools such as `InterProScan`, `Prokka`, `funannotate`, `eggNOG-mapper`, and `DIAMOND` commonly use UniProt data for 
protein function annotation, domain prediction, and custom sequence searches, making the pre-downloaded datasets on your HPC ideal for faster, offline analysis.
</div>

{% include accordion title="Limitations" class=" " controls="uniprot-3" icon=false %}
<div id="uniprot-3" class="accordion_content" markdown='1' hidden>

- **Swiss-Prot** coverage is limited (curation is manual and slower)  
- **TrEMBL** records may contain redundant or less reliable annotations  
- multiple isoforms can be confusing; must check the **canonical sequence**  

</div>

{% include accordion title="Practical Tips" class=" " controls="uniprot-4" icon=false %}
<div id="uniprot-4" class="accordion_content" markdown='1' hidden>

- cite **UniProt accessions** (e.g., `P38398`) rather than gene names for reproducibility  
- for large-scale analyses, download **FASTA** or **XML** datasets via FTP instead of the web  
- check whether a record belongs to **Swiss-Prot (curated)** or **TrEMBL (unreviewed)**  
- use the [UniProt ID mapping service](https://www.uniprot.org/id-mapping) to convert between UniProt IDs, [RefSeq](#refseq), [Ensembl](#ensembl), and other identifiers  

</div>

{% include accordion title="CLI download" class=" " controls="uniprot-5" icon=false %}
<div id="uniprot-5" class="accordion_content" markdown='1' hidden>

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1"> 
UniProt is large (tens to hundreds of GB uncompressed), so when working with:
- annotation tools like `Prokka`, `funannotate`, `InterProScan`
- custom protein search via `BLAST` or `DIAMOND`
- functional pipelines using KO, GO, EC mappings  
it is recommended to use the existing files rather than redownloading. You’ll save time, storage, and bandwidth.
</div></div>

The directory **/reference/data/Uniprot/** (accessible on both supercomputers) contains multiple versions of UniProt releases, including:
- dated releases: `2018-18-07`, `2020-17-06`, `2021-08-01`, `2023-09-12`, `2025-07-07`
- a **latest/** symlink or folder pointing to the most recent version
- **TrEMBL/** - a subset of automatically annotated protein entries
- **uniprot_sprot_plants** - curated plant-specific Swiss-Prot entries

UniProt FTP site: <https://ftp.uniprot.org/pub/databases/uniprot/>  

1. Download Swiss-Prot (curated proteins, 89M):  
```bash
wget ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/uniprot_sprot.fasta.gz
```
2. Download TrEMBL (unreviewed proteins): **(WARNING: 59G)**
```bash
wget ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/uniprot_trembl.fasta.gz
```
3. Download by accession via [Entrez Direct](https://www.ncbi.nlm.nih.gov/books/NBK179288/) (entry P38398, 2.1K):
```bash
# Fetch UniProt entry in text format
esearch -db protein -query "P38398" | efetch -format fasta > RAD51_protein.fasta
```
4. Programmatic query with cURL (REST API, 2.1K):
```bash
curl "https://rest.uniprot.org/uniprotkb/P38398.fasta" -o RAD51_protein.fasta
```
</div>
</div>
</div>

<!-- PDB -->

{% include accordion title="<h2 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>PDB</h2><span style='font-weight: 300;'>(primary) 3D structural data for proteins, nucleic acids, and complexes</span>" class="outline" controls="special-3" icon=false %}
<div id="special-3" class="accordion_content" markdown='1' hidden> 
**Full name:** Protein Data Bank (PDB)  
**URL:** <https://www.rcsb.org/>  
**FTP:** <https://files.rcsb.org/>  
**File Download Services:** <https://www.rcsb.org/docs/programmatic-access/file-download-services>  
**Scope:** global archive of experimentally determined **three-dimensional structures** of proteins, DNA, RNA, and macromolecular complexes  

{% include alert class="tip" content="PDB structures are essential for **structure-based drug design**, **protein modeling**, and interpreting the **functional impact of genetic variants** on protein stability or interactions." %}

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="Characteristics" class=" " controls="pdb-1" icon=false %}
<div id="pdb-1" class="accordion_content" markdown='1' hidden>

- structures determined by **X-ray crystallography**, **NMR**, and **cryo-electron microscopy**  
- supports standard formats: `.pdb`, `.cif`, `.xml`, and `.mmtf`  
- each entry has a unique **4-character ID** (e.g., `1A2B`)  
- annotations: atomic coordinates, ligands, domains, secondary structure, quality metrics  
- integrates with [UniProt](#uniprot), [Pfam](http://pfam.xfam.org), [SCOP2](https://www.ebi.ac.uk/pdbe/scop/)/[CATH](https://www.cathdb.info), [DrugBank](https://go.drugbank.com), and variant databases  
- part of the [Worldwide PDB consortium](https://www.wwpdb.org) ([RCSB](https://www.rcsb.org), [PDBe](https://www.ebi.ac.uk/pdbe/), [PDBj](https://pdbj.org), [BMRB](https://bmrb.io))  

</div>

{% include accordion title="Applications" class=" " controls="pdb-2" icon=false %}
<div id="pdb-2" class="accordion_content" markdown='1' hidden>

- analyze **protein-ligand**, **protein-protein**, or **nucleic acid interactions**  
- map mutations or variants onto 3D structures  
- perform **homology modeling** or structure prediction benchmarking  
- use in **docking simulations**, drug screening, and antibody modeling  
- visualize molecular structures for teaching or presentations  

Tools such as `PyMOL`, `Chimera/X`, `MODELLER`, `AlphaFold`, `Rosetta`, and `MDAnalysis` use PDB structures for 
visualization, homology modeling, structure prediction, or molecular dynamics simulations.
</div>

{% include accordion title="Limitations" class=" " controls="pdb-3" icon=false %}
<div id="pdb-3" class="accordion_content" markdown='1' hidden>

- structures may be incomplete (e.g., unresolved loops or termini)  
- experimental artifacts or low resolution can affect interpretation  
- limited coverage - not all proteins or complexes have known structures  
- requires basic knowledge of molecular modeling for effective use  
- redundancy: multiple entries for the same protein (different conformations/complexes)  

</div>

{% include accordion title="Practical Tips" class=" " controls="pdb-4" icon=false %}
<div id="pdb-4" class="accordion_content" markdown='1' hidden>

- use the **RCSB PDB portal** for structure search by gene, ligand, or function  
- visualize structures interactively via [Mol* Viewer](https://molstar.org/) or **PyMOL**, **Chimera**, **Jmol**  
- check resolution, R-factors, and missing regions in the structure summary  
- align and compare structures using RCSB’s [Structure Alignment](https://www.rcsb.org/alignment) tools  
- cross-reference with [UniProt](#uniprot) to link sequences and functions  

</div>

{% include accordion title="CLI download" class=" " controls="pdb-5" icon=false %}
<div id="pdb-5" class="accordion_content" markdown='1' hidden>
Due to the size and frequent updates of the full PDB archive, users typically download only specific structures (by PDB ID) or small subsets relevant to their study.

PDB FTP: <https://files.rcsb.org/>  

1. Download structure by PDB ID (e.g., `1A2B`, 151K):
```bash
wget https://files.rcsb.org/download/1A2B.pdb
```
2. Download `mmCIF` version (preferred for newer tools, 209K):
```bash
wget https://files.rcsb.org/download/1A2B.cif
```
3. Use **pdb-tools** to manipulate files:
```bash
conda install -c conda-forge pdb-tools
pdb_selchain -A 1A2B.pdb > chainA.pdb
```
4. View basic structure summary via [API](https://www.rcsb.org/docs/programmatic-access/web-apis-overview):
```bash
curl https://data.rcsb.org/rest/v1/core/entry/1A2B
```
</div>
</div>
</div>  <!-- closed record-->
</div>  <!-- closed section -->
</div>  <!-- closed process-list -->




## Practical guidance

The choice of database depends on what kind of data you generate or need to interpret. Knowing whether you are dealing with sequences, 
variants, expression profiles, or protein structures helps you query the right resource, avoid common pitfalls, and make your analysis reproducible.

<div class="usa-accordion " >
{% include accordion title="Quick Quiz: Check your understanding" controls="quiz-formats" expanded=false class="question" icon=true %}
<div id="quiz-formats" class="accordion_content" markdown='1'>
Now that you've explored standard file formats, their structure, and their applications, 
try these short questions to test your knowledge and avoid common pitfalls when working with genomic data.

{% include question qid="1,2,3,4,5,6,7,8,9,10" %}
</div>
</div>

<div class="process-list ul" markdown="1">


### Databases on SCINet

The SCINet supercomputers hosts a wide range of pre-downloaded bioinformatics databases and resources under the **/reference/data** directory. 
These resources support various tools such as `BLAST+`, `Kraken`, `BUSCO`, `Prokka`, `HUMAnN`, `Kaiju`, and others. 

```bash 
ls /reference/data/ 
```

<details markdown="1"><summary><b>List of pre-downloaded databases on SCINet HPC</b></summary>

{% include table caption="" sortable=true content="| Folder Path | Description | Common Tools |
|-------------------------|-----------------------------------------------------------|------------------------------------------------|
| BUSCO/                  | lineage datasets for benchmarking genome completeness     | `BUSCO`, `funannotate`                         |
| Uniprot/                | protein sequence data from UniProtKB                      | `InterProScan`, `eggNOG`, `Prokka`, `BLAST`    |
| Pfam/                   | protein families (HMMs)                                   | `HMMER`, `InterProScan`, `Prokka`              |
| RepBase/                | repetitive element sequences                              | `RepeatMasker`, `RepeatModeler`                |
| Dfam/                   | profile HMMs for repetitive elements                      | `RepeatMasker`, `EDTA`                         |
| NCBI/taxdump/           | NCBI Taxonomy dump files                                  | `Kraken2`, `Kaiju`, `MEGAN`, `GTDB-Tk`         |
| NCBI/blast/             | preformatted BLAST databases                              | `BLAST+`                                       |
| NCBI/blast_taxdb/       | taxonomy information for BLAST DBs                        | `BLAST+`, `blastdbcmd`                         |
| NCBI/kraken*/           | Kraken database build, KrakenUniq database build,  compact Kraken DB for fast classification | `Kraken`    |
| NCBI/16SMicrobial/      | NCBI's 16S reference sequences                            | `Kraken`, `PhyloFlash`, `QIIME2`, `Kaiju`      |
| gtdbtk/                 | GTDB reference genomes and taxonomy                       | `GTDB-Tk`                                      |
| eggnogdb/               | ortholog and functional annotation database               | `eggNOG-mapper`, `DRAM`, `funannotate`         |
| dbCAN2/                 | carbohydrate-active enzyme HMMs                           | `dbCAN2`, `DRAM`                               |
| pantherdb/              | protein family classification                             | `InterProScan`, `Gene Ontology tools`          |
| humann/                 | metabolic and pathway annotation databases                | `HUMAnN`                                       |
| humann2/                | previous version of HUMAnN annotation DBs                 | `HUMAnN2`                                      |
| metaphlan/              | marker gene database for taxonomic profiling              | `MetaPhlAn`, `HUMAnN`                          |
| checkm/                 | marker sets for genome quality assessment                 | `CheckM`                                       |
| checkm2/                | updated marker sets and models for CheckM2                | `CheckM2`                                      |
| get_homologues/         | gene family clustering data                               | `GET_HOMOLOGUES`                               |
| picrust2/               | functional prediction reference files                     | `PICRUSt2`                                     |
| snpEff/                 | variant effect annotation databases                       | `SnpEff`                                       |
| alphafold/              | protein structure prediction models                       | `AlphaFold`                                    |
| alphafill/              | structural complement to AlphaFold (ligand binding)       | `AlphaFill`, structural modeling               |
| omegafold/              | alternative structure prediction models                   | `OmegaFold`                                    |
| rosettafold/            | deep learning models for structure prediction             | `RosettaFold`                                  |" %}

**NCBI folder** includes additional species-specific directories (e.g., **mus_musculus/**, **pacific_oyster/**) that typically contain reference genomes, 
annotations, or indexes used in species-specific analyses such as alignment, variant calling, or functional annotation.
</details>

{% include alert class="tip" content="The contents of **/reference/data/** may change over time as new resources are added or updated. Before starting your analysis, it's a good idea to explore the directory to check for pre-downloaded datasets that could save you time." %} 

{% include alert class="highlighted" content="Before downloading any database manually, it's recommended to check these `/reference/data` location first to avoid redundancy. If you need a resource that isn't there but may benefit others, [contact the VRSC](https://scinet.usda.gov/support/contact#contact-the-vrsc) to request its addition." %}


### Efficient downloads

Large biological datasets (e.g., genomes, raw reads, daily database updates) can be many gigabytes in size. 
Downloading them with plain `wget` works, but it may be slow or prone to interruption. 
Tools like **`aria2c`** and **Aspera (`ascp`)** offer faster, more reliable alternatives. 

*Use optimized tools and replace the FTP/HTTP link with the address of the file you need.* 
- use **FTP** for bulk dumps,  
- use **EDirect** for specific records by accession  


**`wget`** (simple & robust; `-c` allows resume if interrupted) or **`curl`**
```bash
wget -c ftp://ftp.ncbi.nlm.nih.gov/genbank/README.genbank
curl ftp://ftp.ncbi.nlm.nih.gov/genbank/README.genbank -o README.genbank 
```

**`aria2c`** (multi-connection downloader, not available on Atlas)
```bash
# Split file into 8 segments, download in parallel
aria2c -x 8 -s 8 ftp://ftp.sra.ebi.ac.uk/vol1/fastq/ERR000/ERR000001/ERR000001_1.fastq.gz
```

**`ascp`** ([Aspera](https://scinet.usda.gov/guides/data/datatransfer#data-transfer-to-ncbi); much faster for raw reads; only from [ENA](#ena)/[SRA](#sra) databases)
```bash
# syntax
ascp -i <asperaweb_id_dsa.openssh with path> -k1 -Tr –l100m anonftp@ftp.ncbi.nlm.nih.gov:/<files_to_transfer> <local_destination>
# test download
ascp -T -l640M -i /opt/aspera/etc/asperaweb_id_dsa.openssh anonftp@ftp.ncbi.nlm.nih.gov:1GB ./
```

**`esearch`** ([NCBI EDirect](https://www.ncbi.nlm.nih.gov/books/NBK179288/); download by accession across INSDC)
```bash
module load edirect        
# or user-install if not available
sh -c "$(curl -fsSL https://ftp.ncbi.nlm.nih.gov/entrez/entrezdirect/install-edirect.sh)"

# Fetch a nucleotide sequence in FASTA format
esearch -db nucleotide -query "NC_001666.2" | efetch -format fasta > corn_chloroplast.fasta

# Fetch the same record with full annotations (GenBank flatfile)
esearch -db nucleotide -query "NC_001666.2" | efetch -format gb > corn_chloroplast.gb

# Fetch raw read metadata by SRA/DRA/ERA accession
esearch -db sra -query "SRP433780" | efetch -format runinfo > SRP433780.csv
```


### Use in real projects  
<br>
If your research requires...

<div class="usa-accordion " data-allow-multiple>

{% include accordion title="downloading large datasets efficiently" controls="dp1" expanded=false class="outline" icon=false %}
<div id="dp1" class="accordion_content" markdown="1">

consider using **command-line tools** instead of browser downloads for large files: 
- `wget`/`curl` for FTP/HTTP  
- `prefetch` + `fasterq-dump` for [SRA](#sra)  
- `gsutil` or AWS CLI for [gnomAD](#gnomad) cloud storage  

*(see section [Efficient downloads](#efficient-downloads) for detailed instructions)*

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-1" icon=true %}
<div id="issue-1" class="accordion_content" markdown='1' hidden>
- Browser downloads for 100+ GB datasets often fail mid-transfer.  
- Slow networks are more reliable when using cloud-native tools such as AWS CLI or `gsutil`.  
- Skipping checksum verification can lead to using corrupted or incomplete files in downstream analysis. 
</div>

{% include accordion title="Good to know" class="tip " controls="tip-1" icon=true %}
<div id="tip-1" class="accordion_content" markdown='1' hidden>
- Always verify file integrity and completeness after transfer with checksums. 
- Use `--continue` (wget) or `-C -` (curl) to resume interrupted transfers.  
- For repetitive downloads, prepare a **batch file with URLs**.  
</div>
</div>

</div>

{% include accordion title="submitting data (e.g., raw sequencing reads) to archives" controls="dp2" expanded=false class="outline" icon=false %}
<div id="dp2" class="accordion_content" markdown="1">

consider depositing your data in the appropriate public/community archive: 
- **raw reads** in FASTQ format to [SRA](#sra) / [ENA](#ena) / [DDBJ](#ddbj) (these synchronize globally)  
- **processed expression data** to [GEO](#geo) / [ArrayExpress](#arrayexpress)  
- **protein sequences & functional annotation** to [UniProt](#uniprot)  
- **3D macromolecular structures (DNA/RNA/protein/complexes)** to [PDB](#pdb)  

Archival submission ensures long-term preservation, global accessibility, and proper citation.  

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-2" icon=true %}
<div id="issue-2" class="accordion_content" markdown='1' hidden>
- Submitting processed data (counts, assemblies) into [SRA](#sra) - these belong in [GEO](#geo)/[ArrayExpress](#arrayexpress).  
- Missing metadata, which delays acceptance and reduces dataset discoverability.  
- Uploading incomplete or poorly described experiments, which limits reuse.  
</div>

{% include accordion title="Good to know" class="tip " controls="tip-2" icon=true %}
<div id="tip-2" class="accordion_content" markdown='1' hidden>
- Check submission guidelines; each archive has **format and validation tools**.
- Prepare required **metadata tables** (organism, experiment type, library prep) early.
- Link raw and processed data (e.g., [SRA](#sra) and [GEO](#geo)) for clarity and reuse.
</div>
</div>

</div>

{% include accordion title="preparing metadata for data submission" controls="dp3" expanded=false class="outline" icon=false %}
<div id="dp3" class="accordion_content" markdown="1">

consider documenting **metadata tables** consistently across project phases to ensure smooth submission, improve dataset discoverability, and support reproducibility.  
- **SRA** requires sequencing experiment metadata (e.g., library strategy, platform, read layout).  
- **GEO/ArrayExpress** requires MAGE-TAB files (IDF + SDRF) with sample and experimental design details.  
- **UniProt/PDB** requires organism information, function/annotation, and experimental methods.  

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-3" icon=true %}
<div id="issue-3" class="accordion_content" markdown='1' hidden>
- Submitting sequences without metadata leads to rejection or makes data unusable.  
- Using inconsistent sample names across raw data and metadata tables.  
- Omitting critical experimental parameters (e.g., sequencing kit, growth conditions).  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-3" icon=true %}
<div id="tip-3" class="accordion_content" markdown='1' hidden>
- Start building **metadata tables** at project planning stage and update continuously.  
- Use controlled vocabularies or ontologies (e.g., [NCBI Taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy), [Experimental Factor Ontology](https://www.ebi.ac.uk/ols/ontologies/efo)) where possible.  
- Validate files with archive-specific checkers before submission
  - GEO’s [MAGE-TAB validator](https://www.ncbi.nlm.nih.gov/geo/info/soft2.html#validator) (see [MAGETabulator, a suite of tools to support the microarray data format MAGE-TAB](https://pmc.ncbi.nlm.nih.gov/articles/PMC2638998/))   
</div>
</div>

</div>

{% include accordion title="finding curated reference sequences for annotation" controls="dp4" expanded=false class="outline" icon=false %}
<div id="dp4" class="accordion_content" markdown="1">

consider using [RefSeq](#refseq) for stable, non-redundant gene and transcript models, or [GENCODE](#gencode)/[Ensembl Plants](https://plants.ensembl.org/index.html) for comprehensive annotations.  
- Match genome build and annotation release to avoid mapping errors.  
- Use accessioned *RefSeq IDs* in clinical/diagnostic contexts. 
- Use *Ensembl IDs* for comparative genomics.  

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-4" icon=true %}
<div id="issue-4" class="accordion_content" markdown='1' hidden>
- Mixing genome builds (e.g., GRCh37 annotations with GRCh38 alignments).  
- Using outdated or draft crop gene sets, leading to missing or misannotated loci.  
- Ignoring annotation version numbers, which can cause reproducibility issues.  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-4" icon=true %}
<div id="tip-4" class="accordion_content" markdown='1' hidden>
- Always record the **genome build** (*GRCh38*, *TAIR10*, *IRGSP-1.0*, etc.) and annotation release used.  
- [RefSeq](#refseq) is curated and non-redundant, while [GENCODE](#gencode) and [Ensembl Plants](https://plants.ensembl.org/index.html) provide broader transcript diversity.  
- Use [BioMart](http://useast.ensembl.org/biomart/martview/e03bf4380d6cb103e56668f87af7a074) or APIs to quickly retrieve gene sets for custom analyses.  
</div>
</div>

</div>

{% include accordion title="tracking variants in crops or wildlife genomes" controls="dp5" expanded=false class="outline" icon=false %}
<div id="dp5" class="accordion_content" markdown="1">

consider building a **project-specific variant panel** if no population resource exists.  
- [dbSNP](#dbsnp) coverage is limited for non-human species.  
- Use public resources when available, such as [MaizeGDB](https://www.maizegdb.org), [WheatIS](https://wheatis.org), [TreeGenes](https://treegenesdb.org).  
- Deposit variants in [VCF](/bioinformatics/resources/file_formats#vcf--bcf) format with clear metadata in a public repository 
(e.g., [Dryad](https://datadryad.org), [Figshare](https://figshare.com)) or species-specific databases. 

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-5" icon=true %}
<div id="issue-5" class="accordion_content" markdown='1' hidden>
- Assuming [dbSNP](#dbsnp), [ClinVar](#clinvar), or [gnomAD](#gnomad) provide allele frequencies for plants or animals - these are human-focused resources.  
- Depositing raw reads in [SRA](#sra) without sharing the [VCF](/bioinformatics/resources/file_formats#vcf--bcf) makes results difficult to reuse.  
- Incomplete metadata (missing sample identifiers, gruping info) reduces dataset value.  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-5" icon=true %}
<div id="tip-5" class="accordion_content" markdown='1' hidden>
- Always pair **raw reads** in [SRA](#sra)/[ENA](#ena)/[DDBJ](#ddbj) with **VCF variant calls** in a suitable repository.  
- Use dedicated portals when available ([MaizeGDB](https://www.maizegdb.org), [WheatIS](https://wheatis.org), [TreeGenes](https://treegenesdb.org)).  
- For novel organisms, general-purpose repositories like [Dryad](https://datadryad.org) or [Figshare](https://figshare.com) ensure long-term accessibility.  
- Provide **metadata tables** (population, location, sequencing method, pipeline parameters) to maximize reusability.  
</div>
</div>

</div>

{% include accordion title="filtering common vs rare alleles in natural populations" controls="dp6" expanded=false class="outline" icon=false %}
<div id="dp6" class="accordion_content" markdown="1">

consider generating **allele frequencies** by resequencing multiple individuals in your target population.  
- Pool-seq is cost-effective for wild populations. *(see [NGS of Pooled Samples: Guideline for Variants’ Filtering](https://www.nature.com/articles/srep33735))*  
- Store raw reads in [SRA](#sra)/[ENA](#ena)/[DDBJ](#ddbj), and publish derived frequency tables as supplementary data or in community repositories. 

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-6" icon=true %}
<div id="issue-6" class="accordion_content" markdown='1' hidden>
- Using [gnomAD](#gnomad) for filtering in plants or wildlife studies - gnomAD is human-only.  
- Small sample sizes leading to unreliable allele frequency estimates.  
- Mixing populations (e.g., different ecotypes or geographic origins) without stratification, which biases frequency calculations.  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-6" icon=true %}
<div id="tip-6" class="accordion_content" markdown='1' hidden>
- For non-model organisms, allele frequency resources are often missing - generating your own estimates is essential.  
- Tools like [VCFtools](http://vcftools.sourceforge.net/) or [PLINK](https://www.cog-genomics.org/plink/) can calculate allele frequencies directly from VCF files.  
- Consider depositing frequency tables in **Dryad** ([datadryad.org](https://datadryad.org)) or **Figshare** ([figshare.com](https://figshare.com)) for long-term accessibility.  
- Document population metadata (sampling site, number of individuals, sequencing method) alongside frequency data.  
</div>
</div>

</div>

{% include accordion title="analyzing gene expression in plant tissues or stress conditions" controls="dp7" expanded=false class="outline" icon=false %}
<div id="dp7" class="accordion_content" markdown="1">

consider exploring **expression databases** to compare your results with public data or to validate stress/tissue-specific patterns.  
- Use [GEO](#geo) and [ArrayExpress](#arrayexpress) to find curated expression datasets under various conditions.  
- Explore [Expression Atlas](https://www.ebi.ac.uk/gxa/home) for cross-study comparisons of tissue- or condition-specific expression.  
- For non-model species, check clade-specific portals such as [Phytozome](https://phytozome-next.jgi.doe.gov/) or [Ensembl Plants](https://plants.ensembl.org/), which often include baseline RNA-seq profiles.  

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-7" icon=true %}
<div id="issue-7" class="accordion_content" markdown='1' hidden>
- Searching only human/mammalian datasets and overlooking plant-focused repositories.  
- Missing relevant metadata (e.g., tissue, treatment, developmental stage) when reusing public datasets.  
- Confusing raw data archives ([SRA](#sra)) with curated expression repositories ([GEO](#geo), [ArrayExpress](#arrayexpress)).  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-7" icon=true %}
<div id="tip-7" class="accordion_content" markdown='1' hidden>
- [Expression Atlas](https://www.ebi.ac.uk/gxa/home) provides ready-to-use expression summaries across multiple species and conditions.  
- [Ensembl Plants](https://plants.ensembl.org/) links gene models with RNA-seq expression evidence when available.  
- For specific crops, community portals (e.g., [MaizeGDB](https://www.maizegdb.org), [WheatIS](https://wheatis.org)) sometimes host expression datasets.  
- Always record the dataset accession (e.g., *GSE ID* in [GEO](#geo), *E-MTAB ID* in [ArrayExpress](#arrayexpress)) for reproducibility.  
</div>
</div>

</div>

{% include accordion title="finding closest model organism" controls="dp8" expanded=false class="outline" icon=false %}
<div id="dp8" class="accordion_content" markdown="1">

consider selecting a **well-annotated model organism** whose genome and functional resources can serve as a proxy when your study species lacks comprehensive annotation.  
- **Dicots**: [*Arabidopsis thaliana*](https://www.arabidopsis.org/) is the default reference for functional enrichment.  
- **Monocots**: [*Oryza sativa*](https://rapdb.dna.affrc.go.jp/) (rice) is the most widely used reference, especially for cereals.  
- **Trees**: [*Populus trichocarpa*](https://phytozome-next.jgi.doe.gov/info/Ptrichocarpa_v4_1) is a common model for woody perennials.  
- **Other taxa**: look for clade representatives with rich databases (e.g., legumes → [*Medicago*](https://medicago.toulouse.inrae.fr/MtrunA17r5.0-ANR/)).  

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-8" icon=true %}
<div id="issue-8" class="accordion_content" markdown='1' hidden>
- Defaulting to *Arabidopsis* in all plant studies can misrepresent pathways and functions.  
- Choosing models with poor or outdated annotation reduces the value of downstream functional enrichment.  
- Ignoring phylogenetic distance may lead to incorrect orthology assignments.  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-8" icon=true %}
<div id="tip-8" class="accordion_content" markdown='1' hidden>
- Use [Ensembl Plants](https://plants.ensembl.org/index.html), [Phytozome](https://phytozome-next.jgi.doe.gov/), or [OrthoDB](https://www.orthodb.org/) to check orthology relationships.  
- Follow recommendations from community databases such as [MaizeGDB](https://www.maizegdb.org/), [WheatIS](https://www.wheatis.org/), or [TreeGenes](https://treegenesdb.org/).  
- Prefer models with strong functional annotation coverage: [GO](http://geneontology.org/), [KEGG](https://www.kegg.jp/), [Reactome](https://reactome.org/).  
- Check release notes of model organism databases - frequent updates indicate active curation.  
</div>
</div>
</div>

{% include accordion title="performing functional enrichment of gene lists" controls="dp9" expanded=false class="outline" icon=false %}
<div id="dp9" class="accordion_content" markdown="1">

consider [Gene Ontology (GO)](#gene-ontology-go) for functional categories, [KEGG](#kegg)/[Reactome](#reactome) for pathway enrichment.  
- For plants, use orthology mappings to the **closest well-annotated model organism** as a reference (e.g., *Arabidopsis thaliana* for dicots, *Oryza sativa* for monocots).  
- Commonly used enrichment tools include [g:Profiler](https://biit.cs.ut.ee/gprofiler/), [DAVID](https://davidbioinformatics.nih.gov), and [clusterProfiler](https://guangchuangyu.github.io/software/clusterProfiler/).  

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-9" icon=true %}
<div id="issue-9" class="accordion_content" markdown='1' hidden>
- Running GO enrichment without background correction can inflate false positives.  
- Mixing identifiers (e.g., *RefSeq* vs. *Ensembl IDs*) may cause gene loss in enrichment.  
- Applying human-only background sets (e.g., from [gnomAD](#gnomad) or [ClinVar](#clinvar)) to plants or wildlife studies is inappropriate.  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-9" icon=true %}
<div id="tip-9" class="accordion_content" markdown='1' hidden>
- Always define the **background set** (all expressed genes or all genes tested) to control enrichment properly.  
- Cross-check enriched terms across [GO](http://geneontology.org/), [KEGG](https://www.kegg.jp/), and [Reactome](https://reactome.org/) for robustness.  
- Some community portals (e.g., [MaizeGDB](https://www.maizegdb.org/), [WheatIS](https://wheatis.org/)) offer species-specific enrichment options.  
- Keep track of ontology/database **release versions** for reproducibility.  
</div>
</div>

</div>

{% include accordion title="retrieving protein sequences and functional annotations" controls="dp10" expanded=false class="outline" icon=false %}
<div id="dp10" class="accordion_content" markdown="1">

consider using [UniProtKB](#uniprot) for protein sequence and functional annotation retrieval.
- **Swiss-Prot** (reviewed, curated) for high-quality annotations (ideal for reference sets, functional studies, and benchmarking)
- **TrEMBL** (unreviewed) automatically annotated sequences that expand coverage to non-model organisms and novel proteins  

***How to retrieve data?***  
- Search by *gene name*, *accession*, or *organism* in [UniProt](#uniprot).  
- Download **FASTA sequences**, **annotations**, or **complete proteomes** for your species.  
- Use programmatic access via the [UniProt REST API](https://www.uniprot.org/help/api_queries) for large-scale retrieval.  
- Cross-links to [GO](http://geneontology.org/), [KEGG](https://www.kegg.jp/), [Reactome](https://reactome.org/), [Pfam](http://pfam.xfam.org/), [InterPro](https://www.ebi.ac.uk/interpro/) are embedded in UniProt.  

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-10" icon=true %}
<div id="issue-10" class="accordion_content" markdown='1' hidden>
- Confusion with [GenBank](#genbank) - it accepts protein sequences but lacks curated knowledge; UniProtKB (Swiss-Prot + TrEMBL) is the best resource for protein annotations.  
- Mixing identifiers (*RefSeq*, *Ensembl*, *UniProt* accessions) without proper mapping can cause data loss.  
- Annotations are actively updated - record the **release version** used in your analysis.  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-10" icon=true %}
<div id="tip-10" class="accordion_content" markdown='1' hidden>
- Use [UniProt proteome pages](https://www.uniprot.org/proteomes/) to download species-specific complete proteomes.  
- The [UniProt ID mapping service](https://www.uniprot.org/id-mapping) helps convert between *RefSeq*, *Ensembl*, and *UniProt* identifiers.  
- For batch queries, upload gene or protein lists directly to UniProt’s search interface or use the REST API.  
- Swiss-Prot entries often include experimental evidence codes - useful for distinguishing reviewed from predicted annotations.  
</div>
</div> 

</div>

{% include accordion title="studying 3D protein structures of enzymes or receptors" controls="dp11" expanded=false class="outline" icon=false %}
<div id="dp11" class="accordion_content" markdown="1">

consider querying the [Protein Data Bank (PDB)](#pdb) for experimentally solved structures.  
- Explore structures online with the [Mol* viewer](https://molstar.org/viewer/) or locally with **PyMOL** and **Chimera**.  
- If no experimental structure exists, generate homology models: [AlphaFold 3](https://alphafoldserver.com/welcome) or [Swiss-Model](https://swissmodel.expasy.org).  

<div class="usa-accordion" style="margin-top: 1em;" data-allow-multiple>
{% include accordion title="Common issues" class="highlighted" controls="issue-11" icon=true %}
<div id="issue-11" class="accordion_content" markdown='1' hidden>
- Expecting complete proteins: many PDB entries are partial or contain only specific domains.  
- Resolution varies: not all structures are high quality (check the resolution in Ångströms).  
- Structures may include engineered mutations, ligands, or missing flexible regions that do not reflect the native protein.  
</div>

{% include accordion title="Good to know" class="tip" controls="tip-11" icon=true %}
<div id="tip-11" class="accordion_content" markdown='1' hidden>
- Use the **UniProt cross-links** in protein records to find corresponding PDB entries.  
- Check [AlphaFold DB](https://alphafold.ebi.ac.uk) for predicted full-length structures when absent from PDB.  
- Many journals require linking to a PDB ID when publishing structural biology results.  
- For enzyme studies, [RCSB PDB](https://www.rcsb.org/) offers search filters for ligands, cofactors, and binding sites.  
</div>
</div>

</div>

</div>



</div>


{% if page.takeaways %}
## Best Practices

<ul>
  {% for takeaway in page.takeaways %}
    <li>{{ takeaway }}</li>
  {% endfor %}
</ul>
{% endif %}