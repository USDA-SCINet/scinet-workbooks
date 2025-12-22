---
title: File formats in Bioinformatics
description: "Learn about common bioinformatics file formats and how they represent sequences, annotations, and genomic variants"
svg: /genomics.svg
author: Aleksandra Badaczewska

header:
  overlay_image: 07-wrangling/assets/img/07_data_acquisition_banner.png
index: 
order: 3
wg: Bioinformatics
description: ""
type: reference material

objectives: 
  - Understand the role of standard file formats in bioinformatics workflows.
  - Learn the structure and key components of common formats (e.g., FASTQ, SAM/BAM, VCF, GTF).  
  - Identify which file types are used at different stages of analysis.  
  - Develop skills to inspect, interpret, and validate file content. 

applications:
  - Checking file integrity and consistency.  
  - Performing quality control on sequencing data.  
  - Preparing inputs for bioinformatics tasks.
  - Recognizing intermediate and final results.

terms: [Data Formats, File Extension, File Compression, Nucleotide Sequence, Sequencing Technologies, Read, Aligned Reads, Variant, Annotation, Feature, Gene, Transcript, Exon, Genome Index, Genomic Coordinates]

takeaways: 
  - Use the correct file format for each stage of analysis (e.g., FASTQ for raw reads, VCF for variants).  
  - Validate files before use to catch truncation, formatting errors, or reference mismatches.  
  - Always inspect headers and a few sample lines to confirm file identity, structure, and metadata.  
  - Apply compression (bgzip, pigz) and indexing (.bai, .tbi, .fai) to handle large datasets efficiently.  
  - Use knowledge of format structure to troubleshoot pipeline errors and ensure smooth integration of tools.  
  - Convert between formats with reliable tools (samtools, bcftools, gffread) rather than manual editing.  
  - Maintain consistency between file formats and reference versions (e.g., genome build, chromosome naming).  

overview: [objectives, applications, terminology]

questions:
  - question: "What type of sequences can FASTA files contain?"
    title: "FASTA Content"
    qid: 1
    solution: "FASTA can store DNA, RNA, or protein sequences - each entry begins with a header line starting with `>` followed by sequence data."

  - question: "Why is it important to distinguish between 0-based and 1-based coordinate systems when working with genomic formats?"
    title: "Coordinate Systems and Errors"
    qid: 2
    solution: "Because BED (0-based half-open) and GTF/GFF3/VCF (1-based closed) use different conventions, mixing them without conversion causes off-by-one errors and misaligned features. Learn more in [Genomic coordinate system](#genomic-coordinate-system) section."

  - question: "Which file format contains both nucleotide sequences and per-base quality scores?"
    title: "Raw Sequencing Data"
    qid: 3
    answers:
      - FASTA
      - FASTQ
      - SAM
    responses:
      - FASTA contains sequences only, no quality scores.
      - Correct! FASTQ encodes sequences and base quality scores.
      - SAM stores aligned reads, not raw sequencer output.
    answer: 2

  - question: "What is the key difference between BAM and SAM formats?"
    title: "Alignment File Types"
    qid: 4
    answers:
      - BAM is binary and compressed, while SAM is plain text.
      - BAM contains quality scores, while SAM does not.
      - SAM can be indexed, but BAM cannot.
    responses:
      - Correct! BAM is the binary compressed version of SAM.
      - Both contain quality scores — that’s not the difference.
      - Both SAM and BAM can be indexed, but BAM requires `.bai` for random access.
    answer: 1

  - question: "Which annotation format uses key=value pairs in the attributes column?"
    title: "Annotation File Structures"
    qid: 5
    answers:
      - GTF
      - GFF3
      - BED
    responses:
      - GTF uses quoted key-value pairs (`key "value";`).
      - Correct! GFF3 attributes are `key=value` separated by semicolons.
      - BED does not have an attributes column, only intervals and optional fields.
    answer: 2

  - question: "Consider a genomic feature spanning 11869–12227 on chr1 (forward strand). In BED format, what would the start coordinate be?"
    title: "Coordinate Systems"
    qid: 6
    answers:
      - 11869
      - 11868
      - 12227
    responses:
      - 11869 is correct for GTF/VCF, not BED.
      - Correct! BED uses 0-based start, so it shifts by -1.
      - 12227 is the end coordinate, not the start.
    answer: 2

  - question: "Which format is binary, compressed, and cannot be viewed directly in a text editor?"
    title: "Binary Genomic Formats"
    qid: 7
    answers:
      - SAM
      - VCF
      - BCF
    responses:
      - SAM is plain text and human-readable.
      - VCF is also text-based.
      - Correct! BCF is the binary form of VCF.
    answer: 3

  - question: "What auxiliary file enables fast random access in a BAM file?"
    title: "Index Files"
    qid: 8
    answers:
      - .tbi
      - .fai
      - .bai
    responses:
      - .tbi indexes tabix-compressed files like VCF.
      - .fai indexes FASTA files.
      - Correct! `.bai` is the BAM index.
    answer: 3

---


<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1">
Familiarity with basic biological concepts (e.g., DNA, RNA, genes, genomes, sequencing technologies, reads) is assumed. 
No prior experience with bioinformatics tools is required.

Familiarity with the [command line](/computing-skills/) is expected.
</div></div>


## Overview

Bioinformatics relies on **structured data formats** to represent sequencing outputs, alignments, annotations, and analysis results. 
These formats act as the "language" through which tools communicate, and understanding them is essential for interpreting results or building reliable workflows.

In this reference material, you will explore the major file formats used across genomics and transcriptomics, from raw reads to interpretable outputs. 
You'll learn what each format contains, how it's structured, why it's used, and how to identify or troubleshoot common issues.

{% include overviews %}


## File formats in Bioinformatics

Bioinformatics workflows depend on standard file formats to manage data generated at every stage of bioinformatics analysis: 
from raw sequencing reads to processed outputs like alignments, variants, or expression levels. 
Many of these formats require paired index files (`.bai`, `.tbi`, `.fai`) to allow fast access during analysis.

| **Format**              | **Content**                                | **Notes**                                                    |
|-------------------------|--------------------------------------------|--------------------------------------------------------------|
| [FASTA](#fasta)         | reference sequences or assembled contigs   | contains plain sequence with headers; used for sequenece assembly (genome or transcriptome) |
| [FASTQ](#fastq)         | raw sequencing reads                       | contains reads + quality scores; often gzipped; 2 files for paired-end (PE) sequencing mode |
| [SAM](#sam--bam--cram)  | read alignments (text-based)               | human-readable; includes mapping, flags, optional tags       |
| [BAM](#sam--bam--cram)  | read alignments (binary)                   | compressed version of SAM; requires `.bai` index             |
| [CRAM](#sam--bam--cram) | compressed alignments                      | smaller than BAM; needs reference to decompress              |
| [GTF](#gtf)             | feature annotations <br>(gene and transcript) | tab-delimited; used by many RNA-seq tools; focused subset of features, standardized for gene models |
| [GFF3](#gff)            | general feature annotations                | broader scope, more flexible than GTF; used in genome browsers |
| [BED](#bed)             | genomic intervals                          | used for peak regions, annotation features, etc.             |
| [VCF](#vcf--bcf)        | variant calls (SNPs, indels)               | text-based; includes genotypes, quality, annotations         |
| [BCF](#vcf--bcf)        | binary VCF                                 | compressed version of VCF; faster to parse                   |
| **INDEX FILES**         | `.bai`, `.tbi`, `.fai`, `.crai`, `.dict`   | required for random access in BAM/VCF/FASTA/CRAM             |


In addition to the core formats, bioinformatics workflows also make use of **complementary formats** for visualization, metadata, and specialized data types:

| **Format**     | **Used For**                               | **Notes**                                                    |
|----------------|--------------------------------------------|--------------------------------------------------------------|
| **BigWig**     | scaled coverage data (visualization)       | compressed, indexed binary format for fast display           |
| **BEDGraph**   | raw coverage signal (text-based)           | similar to BigWig; used as input or intermediate format      |
| **AGP**        | scaffold layout information                | describes how contigs form scaffolds, including gaps         |
| **MTX**        | sparse gene expression matrix              | from single-cell RNA-seq; often paired with barcodes & genes |
| **HDF5**       | hierarchical data (e.g., 10x single-cell)  | efficient storage for large, structured data (e.g. `.h5ad`)  |
| **TSV / CSV**  | expression matrices, metadata              | output of quant tools like Salmon, DESeq2, etc.              |
| **JSON / YAML**| pipeline configs, metadata                 | used by workflow managers (e.g., Snakemake, Nextflow)        |

*Note: Different tools may use different formats for the same analysis step, e.g., Cell Ranger’s `.h5` vs STARsolo’s `.tsv` output.*


### Principles behind standard formats

Bioinformatics file formats provide consistency, interoperability, and structure, ensuring that tools can exchange data reliably across workflows. 
They enforce **standardization** (e.g., `FASTQ` as the universal format for sequencing reads) to ensure compatibility across pipelines and tools, 
balance **readability** (e.g., human-readable formats like `SAM` versus compressed binaries like `BAM` or `CRAM`), 
and make use of **indexing and compression** (e.g., `bgzip`, `.bai`, `.tbi`) to handle (access and store) large datasets efficiently. 
Many formats also embed critical **metadata**, such as sample identifiers, barcodes, or read groups that support accurate downstream analysis. 
Knowing what each file format contains, and why it is used, is essential for troubleshooting, validating results, and building custom pipelines.


## FASTA

**Text-based format for storing nucleotide or amino acid sequences.**

| **Data Type**       | **Components**           | **Molecule**      | **Application**                       |
|---------------------|--------------------------|-------------------|---------------------------------------|
| reference           | genome, transcriptome    | DNA, RNA          | input for mapping/alignment tasks (e.g., RNA-seq pipeline)     |
| assembly            | contigs, scaffolds       | DNA, RNA          | genome or transcriptome assembly task |
| query               | specific sequences       | DNA, RNA          | BLAST queries, motif searching, primer design                  |
| database resource   | collections of sequences | DNA, RNA, Protein | protein DBs (e.g., UniProt), nucleotide DBs (e.g., NR, RefSeq) |


### Example FASTA file(s)

<details markdown="1"><summary><b>DNA (nucleotide) sequence</b></summary>
```markdown
>seq1 Example DNA sequence
ATGCGTAACGTAGCTAGCTAGCTAAGCTAGCTAAGCTAGCTAAGCTAGCTAAGCTAGCTA
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGC
>seq2 Another example sequence
TTGCGTAACGTAGCTAGCTAGCTAAGCTAGCTAAGCTAGCTAAGCTAGCTAAGCTAGC
TAGCTAGCTAGCT
```
This file represents a DNA sequence in FASTA format. The header (`>`) identifies the sequence, typically by **chromosome** or **scaffold** name. 
The sequence is shown in standard IUPAC nucleotide codes. Line breaks are for readability and have no biological significance. 
Typically stores the reference genome assembly used in the alignment step.
</details>

<details markdown="1"><summary><b>RNA (nucleotide) sequence</b></summary>
```markdown
>transcript1 Example mRNA sequence
AUGCGUAACGUAGCUAGCUAGCUAAGCUAGCUAAGCUAGCUAAGCUAGCUAAGCUAGCU
GCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGC
```
This file represents an RNA sequence in FASTA format. The sequence uses `U` (uracil) instead of `T` for RNA. The header (`>`) identifies the **transcript**. 
This format is used in transcriptomics and RNA-seq analyses.
</details>


<details markdown="1"><summary><b>protein (amino acid) sequence</b></summary>
```markdown
>protein1 Example protein sequence
MKTAYIAKQRQISFVKSHFSRQDILDLWIYHTQGYFPDWQNYTPGPGIRYPLKF
GNSHVAQVKETQAAEGLKQGVAIALKALF
```
This file shows an amino acid sequence in FASTA format. Each letter corresponds to an amino acid using standard 20 one-letter codes. 
The header (`>`) typically contains a **protein identifier** and optional description. Protein FASTA files are used in functional annotation and similarity searches.
</details>


### Format structure

Each entry begins with a **header line** starting with `>` (sequence identifier and description), followed by one or more lines of **sequence data**. 
```markdown
> sequence_id description
SEQUENCE-IN-ONE-LETTER-NOTATION
```
- Recommended sequence line length: 60–80 characters.  
- Empty lines are typically ignored by parsers.  
- Multiple sequences can be included in one file.


<div class="highlighted highlighted--error ">
<div class="highlighted__body"  markdown="1"><h4>Common issues</h4></div>
<div style="margin-left: 1.3em; margin-right: 1.3em;" markdown="1">
**Line wrapping mismatch**   
Some tools require sequences on a *single line*, others require *wrapped lines (80 characters)*.

**Improper headers**   
Missing `>` or malformed identifiers can break parsing. 

**Hidden spaces**   
Trailing spaces or carriage returns may cause unexpected errors. 
</div>
&nbsp;
</div>


### File validation

Always check file integrity after download/transfer and validate FASTA format before use.

<div class="usa-accordion " >

{% include accordion title="Compression" class=" " controls="fasta-1" icon=false %}
<div id="fasta-1" class="accordion_content" markdown='1' hidden>
Decompress FASTA files:  
```bash
# Decompress with gunzip
gunzip sequence.fasta.gz          # restores: sequence.fasta
# Decompress bgzip
bgzip -d sequence.fasta.gz        # restores: sequence.fasta
```

Compress FASTA files with `gzip` (or `bgzip` for block compression) to save disk space: 
```bash
gzip sequence.fasta               # output: sequence.fasta.gz 
bgzip sequence.fasta              # output: sequence.fasta.gz (bgzip block-compressed)
```
**Note:** `bgzip` is preferred when the file will be indexed (e.g., for random access).
</div>

{% include accordion title="File integrity" class=" " controls="fasta-2" icon=false %}
<div id="fasta-2" class="accordion_content" markdown='1' hidden> 
Verify file integrity with checksums:
```bash
md5sum sequence.fasta > sequence.fasta.md5
md5sum -c sequence.fasta.md5      # confirm integrity after transfer
```
</div>

{% include accordion title="FASTA validation" class=" " controls="fasta-3" icon=false %}
<div id="fasta-3" class="accordion_content" markdown='1' hidden> 
Use `seqkit` to validate format and detect errors:
```bash
seqkit stats sequence.fasta      # reports #sequences, total length, N content
seqkit validate sequence.fasta   # checks file structure for format errors
```
Common checks:
- All sequences have unique IDs.
- Sequences only contain valid IUPAC characters.
- No truncated or empty entries.
- Consistent line endings (avoid mixing LF/CRLF).
</div>

{% include accordion title="Sequence line wrapping" class=" " controls="fasta-4" icon=false %}
<div id="fasta-4" class="accordion_content" markdown='1' hidden>
Reformat sequence lines for tool compatibility with `seqtk`:
```bash
# Convert to single-line FASTA
seqtk seq -l 0 sequence.fasta > sequence_oneline.fasta
# Re-wrap lines at 60 characters
seqtk seq -l 60 sequence.fasta > sequence_wrapped.fasta
```
Some programs require single-line sequences, others expect wrapped lines (80 chars).
</div>

{% include accordion title="Indexing" class=" " controls="fasta-5" icon=false %}
<div id="fasta-5" class="accordion_content" markdown='1' hidden>
Create a FASTA index for fast random access with `samtools`:
```bash
samtools faidx sequence.fasta     # output: sequence.fasta.fai
```
The `.fai` index stores sequence name, length, and line offsets. Required by many tools (e.g., aligners, variant callers).
</div>


{% include accordion title="Genome completeness" class=" " controls="fasta-6" icon=false %}
<div id="fasta-6" class="accordion_content" markdown='1' hidden> 
Check completeness of a genome assembly with `BUSCO` (Benchmarking Universal Single-Copy Orthologs):
```bash
busco -i assembly.fasta -l eukaryota_odb10 -o busco_out -m genome
```
</div>

</div>
        

## FASTQ

**Text-based format for storing nucleotide sequences together with quality scores.**

| **Data Type**       | **Components**           | **Molecule** | **Application / Analysis Step**                     |
|---------------------|--------------------------|--------------|-----------------------------------------------------|
| raw sequencing      | reads + quality scores   | DNA, RNA     | primary output of NGS machines <br>(Illumina, Nanopore) |
| pre-processed data  | trimmed/filtered reads   | DNA, RNA     | input for alignment or assembly pipelines           |
| subsets             | selected read sets       | DNA, RNA     | downstream testing, debugging, tool benchmarking    |


### Example FASTQ file(s)

<details markdown="1"><summary><b>DNA/cDNA sequencing reads</b></summary>
```markdown
@SRR4420293.1 HWI-ST1136:361:HS250:1:1101:1130:2234/1
GCAACTTCTACAAGCAACTGGGTCGCTCTCTTCCATGACGACTCATCAGAACTGTCATACACGAAGACAGCTATGTCACATGCAGCTAAGGATTCCTTGG
+
CCCFFFFFHHHHHJJJJJJJHIIJJJJJIJJJJIJJJJJJJJJJJJIJJJJJJJIIJJIJJJHHHFFFFEDEEEEEEEDDDDDDDDDDDDDDDDDEDDDD
@SRR4420293.2 HWI-ST1136:361:HS250:1:1101:1409:2108/1
GGCTTTTCCTGCGCAGCTTAGGTGGAAGGCGAAGAAGGCCCCCTTCCGGGGGGCCCGAGCCATCAGTGAGATACTACTCTGGAAGAGCTAGAATTCTAAC
+
CCCFFFFFHHHHHJJJJJJJJJFHJJJJJJJJJJJJJJJJJJJJJJJHHFDDDDDDDDDDDDDDDDEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDEEED
```
The excerpt contains 2 records (reads). Each read entry has four lines. The header line starting with @ (identifier) identifies the read. 
The second line contains the raw DNA sequence (`A`/`C`/`G`/`T` and `N` for unknown bases). A separator line starting with `+` and may repeat the identifier. 
The final line encodes per base Phred quality scores (ASCII-encoded)
</details>


<div class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">SE vs. PE reads</h4>
Sequencing can be performed in **single-end (SE)** mode, producing one FASTQ file per sample, 
or in **paired-end (PE)** mode, producing two files per sample (typically `*_R1.fastq.gz` and `*_R2.fastq.gz`) corresponding to forward and reverse reads.  
</div>
</div>


### Format structure

Each read is represented by four lines:
```bash
@SEQ_ID                                  #1
SEQUENCE-IN-ONE-LETTER-NOTATION          #2
+                                        #3
PER-BASE-QUALITY-SCORE                   #4
--------------------------------------
@SEQ_ID/1                                #1
GATTTGGGGTTCAAAGCAGTATCGATCAAATAGTTA     #2
+                                        #3
!''*((((***+))%%%++)(%%%%).1***-+*''))   #4
```
- Line 1: starts with @, contains sequence identifier.
- Line 2: raw nucleotide sequence.
- Line 3: + separator (optionally repeats identifier).
- Line 4: ASCII-encoded quality string of the same length as sequence.

<div class="process-list ul" markdown="1">

### Quality score

{% include nested_page nest="/bioinformatics/resources/nomenclature" %}
</div>

<div class="highlighted highlighted--error ">
<div class="highlighted__body"  markdown="1"><h4>Common issues</h4></div>
<div style="margin-left: 1.3em; margin-right: 1.3em;" markdown="1">
**Mismatched lengths**  
Sequence and quality strings must have identical length.  

**Encoding confusion**  
Old FASTQ files may use **Phred+64** instead of the standard **Phred+33**.  

**Corrupted compression**  
Interrupted transfers can leave `.fastq.gz` truncated or corrupted.  

**Identifier inconsistencies**  
Paired-end reads may lose sync if filenames or read IDs are inconsistent.  
</div>
&nbsp;
</div>


### File validation

Always check FASTQ files for integrity, encoding, and read quality before analysis.  

<div class="usa-accordion " >

{% include accordion title="Compression" class=" " controls="fastq-1" icon=false %}
<div id="fastq-1" class="accordion_content" markdown='1' hidden>
Compress and decompress FASTQ files:  

```bash
# Compress
gzip reads.fastq
bgzip reads.fastq

# Decompress
gunzip reads.fastq.gz
bgzip -d reads.fastq.gz
```
For large datasets, use `pigz` (parallel `gzip`) for faster compression.
</div>

{% include accordion title="File integrity" class=" " controls="fastq-2" icon=false %}
<div id="fastq-2" class="accordion_content" markdown='1' hidden> 
Verify integrity with checksums: 
```bash 
md5sum reads.fastq.gz > reads.fastq.gz.md5 
md5sum -c reads.fastq.gz.md5      # confirm integrity after transfer 
``` 
</div>

{% include accordion title="FASTQ validation" class=" " controls="fastq-3" icon=false %}
<div id="fastq-3" class="accordion_content" markdown='1' hidden> 
Validate read structure and quality encoding with `seqkit`. Check sequence count, length, and quality.
```bash
seqkit stats reads.fastq.gz
seqkit fqchk reads.fastq.gz
```

</div>

{% include accordion title="Quality control" class=" " controls="fastq-4" icon=false %}
<div id="fastq-4" class="accordion_content" markdown='1' hidden> 
Generate QC reports with `FastQC`:
```bash
fastqc reads.fastq.gz -o qc_reports/
```
Summarize across multiple samples with MultiQC:
```bash
multiqc qc_reports/
```
</div>

{% include accordion title="Conversion" class=" " controls="fastq-5" icon=false %}
<div id="fastq-5" class="accordion_content" markdown='1' hidden> 
Convert FASTQ to FASTA (discarding qualities) with `seqkit` or `seqtk`:
```bash
seqkit fq2fa reads.fastq.gz > reads.fasta
seqtk seq -A reads.fastq.gz > reads.fasta
```
</div>

</div>


## SAM / BAM / CRAM

**Formats for storing aligned sequencing reads to a reference genome.**  
- **SAM**: plain-text, human-readable.  
- **BAM**: binary, compressed SAM (faster and smaller).  
- **CRAM**: reference-based compression (even smaller, requires reference for decompression).  

| **Data Type** | **Components**                 | **Molecule** | **Application / Analysis Step**                       |
|---------------|--------------------------------|--------------|-------------------------------------------------------|
| alignment     | mapped reads, flags, tags      | DNA, RNA     | output of aligners (e.g., BWA, STAR, HISAT2)          |
| post-alignment| sorted & indexed alignments    | DNA, RNA     | input for variant calling, expression quantification  |
| reduced size  | compressed alignments (`CRAM`) | DNA, RNA     | long-term storage, efficient disk use                 |

*Reads (whether DNA-seq, RNA-seq, ChIP-seq, etc.) are always aligned to a DNA reference genome. 
So while the experimental data might be RNA (from RNA-seq), the alignments are stored in the context of the DNA reference.*

### Example SAM file(s)

<details markdown="1"><summary><b>aligned reads / alignment in SAM format (text-based)</b></summary>
```markdown
@SQ SN:chr1 LN:248956422
@PG ID:bwa PN:bwa VN:0.7.17-r1188 CL:bwa mem ref.fa reads.fq

r001  99  chr1  7  60  8M2I4M1D3M  =  37  39  TTAGATAAAGAGGATACTG  *  NM:i:1  MD:Z:8A4^G3
```
**Header line(s)** start with @ (e.g., reference info, program info).   
**Alignment lines** contain fields: *QNAME*, *FLAG*, *RNAME*, *POS*, *MAPQ*, *CIGAR*, *RNEXT*, *PNEXT*, *TLEN*, *SEQ*, *QUAL*. 
Optional tags (e.g., NM:i, MD:Z) carry alignment metadata.
</details>

<div class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">BAM / CRAM are binary files</h4>
Unlike SAM (plain text), **BAM** and **CRAM** are binary formats that cannot be viewed directly in a text editor. 
Use `samtools view` for on-the-fly conversion and content preview (see [File validation](#file-validation-2) section for example commands).  
</div>
</div>


### Format structure

Each alignment line has **11 mandatory fields**, followed by optional tags:  

```bash
   #1   #2    #3  #4   #5    #6    #7    #8   #9 #10  #11 optional #12+ 
QNAME FLAG RNAME POS MAPQ CIGAR RNEXT PNEXT TLEN SEQ QUAL [TAG:TYPE:VALUE]
```
- **QNAME**: query (read) name
- **FLAG**: bitwise flag encoding read properties (e.g., paired, mapped, reverse strand)
- **RNAME/POS**: reference sequence name & alignment start position
- **MAPQ**: mapping quality score
- **CIGAR**: alignment string (matches, insertions, deletions)
- **SEQ/QUAL**: read sequence & qualities

<div class="highlighted highlighted--error ">
<div class="highlighted__body"  markdown="1"><h4>Common issues</h4></div>
<div style="margin-left: 1.3em; margin-right: 1.3em;" markdown="1">
**Unsorted files**  
Variant callers and many tools require coordinate-sorted BAM files.  

**Missing index**  
`.bam` files must be indexed (`.bai`) for random access.  

**Reference mismatch**  
CRAM decompression requires the same reference genome used during compression.  

**Corrupted compression**  
Interrupted downloads/transfers may truncate BAM/CRAM files.  

**Incorrect flags**  
Misinterpretation of FLAG values can lead to wrong assumptions about read pairing or orientation.  
</div>
&nbsp;
</div>


### File validation

Always validate SAM/BAM/CRAM for format correctness, index availability, and alignment integrity before downstream analysis.  

<div class="usa-accordion " >

{% include accordion title="Compression (format conversion)" class=" " controls="sam-1" icon=false %}
<div id="sam-1" class="accordion_content" markdown='1' hidden>
Convert between formats with `samtools`:  

```bash
# SAM to BAM
samtools view -bS input.sam > output.bam

# BAM to SAM
samtools view -h input.bam > output.sam

# BAM to CRAM
samtools view -C -T reference.fa input.bam > output.cram

# CRAM to BAM
samtools view -b -T reference.fa input.cram > output.bam
```
</div>

{% include accordion title="Sorting & Indexing" class=" " controls="sam-2" icon=false %}
<div id="sam-2" class="accordion_content" markdown='1' hidden> 
```bash 
# Sort by coordinate 
samtools sort input.bam -o input.sorted.bam
# Create index
samtools index input.sorted.bam
```
Generates `.bai` (for BAM) or `.crai` (for CRAM). Required for random access.
</div>

{% include accordion title="File integrity" class=" " controls="sam-3" icon=false %}
<div id="sam-3" class="accordion_content" markdown='1' hidden>
Check integrity with `samtools quickcheck`. Verify file consistency and absence of truncation.  
```bash
samtools quickcheck -v input.bam
```
</div>

{% include accordion title="Alignment statistics" class=" " controls="sam-4" icon=false %}
<div id="sam-4" class="accordion_content" markdown='1' hidden> 
Generate alignment summary with `samtools flagstat`:
```bash
samtools flagstat input.bam
```
More detailed stats with:
```bash
samtools stats input.bam > stats.txt
plot-bamstats -p plots/ stats.txt
```
</div>

{% include accordion title="Viewing & Filtering" class=" " controls="sam-5" icon=false %}
<div id="sam-5" class="accordion_content" markdown='1' hidden> 
View alignments or filter by criteria:
```bash
samtools view input.bam | head
samtools view -f 4 input.bam        # unmapped reads
samtools view -q 30 input.bam       # reads with MAPQ ≥30
```
</div>
</div>

## GTF

**Gene Transfer Format is a tab-delimited text format for describing gene annotations on a reference genome.** 
It is a more rigid, widely used variant of [GFF](#gff), often required by RNA-seq tools.  

| **Data Type** | **Components**                          | **Molecule** | **Application / Analysis Step**                     |
|---------------|-----------------------------------------|--------------|-----------------------------------------------------|
| annotation    | exons, transcripts, genes               | DNA, RNA     | RNA-seq quantification (e.g., featureCounts, HTSeq) |
| genome model  | gene models from reference databases    | DNA, RNA     | input for alignment and expression analysis         |
| processed data| standardized annotations (Ensembl, GENCODE) | DNA, RNA | consistent references across pipelines              |

*GTF is a gene annotation format. It describes genomic features (genes, transcripts, exons) mapped to DNA coordinates. 
Even though features represent RNA molecules (like mRNA), they are anchored to the DNA genome.*

### Example GTF file

<details markdown="1"><summary><b>annotation records in GTF format</b></summary>
```markdown
chr1    HAVANA  gene        11869   14409   .   +   .   gene_id "ENSG00000223972"; gene_name "DDX11L1";
chr1    HAVANA  transcript  11869   14409   .   +   .   gene_id "ENSG00000223972"; transcript_id "ENST00000456328";
chr1    HAVANA  exon        11869   12227   .   +   .   gene_id "ENSG00000223972"; transcript_id "ENST00000456328"; exon_number "1";
```
These GTF lines describe a **gene annotation on chromosome 1**: the gene *DDX11L1* (`ENSG00000223972`) located on the forward strand 
from positions **11869–14409**, one of its **transcripts** (`ENST00000456328`) spanning the same coordinates, and the first **exon** of that transcript covering **11869–12227**.  

</details>


### Format structure

GTF files are **tab-delimited with 9 required fields**:  

```bash
     #1     #2       #3        #4      #5    #6     #7    #8          #9
seqname source  feature     start     end score strand frame  attributes
chr1    HAVANA  gene        11869   14409   .   +   .         gene_id "ENSG00000223972"; gene_name "DDX11L1";
```
- (col 1) **seqname**: chromosome
- (col 2) **source**: annotation source (e.g., HAVANA)
- (col 3) **feature**: feature type (gene, transcript, exon, CDS, UTR); features are hierarchical: `gene → transcript → exon/CDS`.
- (col 4-5) : **start** and **end** positions / genomic coordinates; *(see [Genomic coordinate system](#genomic-coordinate-system) section)*
- (col 6) **score**: often `.` if not used
- (col 7) **strand**: `+` or `-`
- (col 8) **frame**: phase for CDS features
- (col 9) **attributes**: Attributes in 9th column encodes metadata as `key "value`. Common attributes include: `gene_id`, `transcript_id`, `gene_name`, `exon_number`.

<div class="highlighted highlighted--error ">
<div class="highlighted__body"  markdown="1"><h4>Common issues</h4></div>
<div style="margin-left: 1.3em; margin-right: 1.3em;" markdown="1">
**Incorrect delimiters**  
Spaces instead of tabs can break parsers.  

**Missing attributes**  
Some tools strictly require `gene_id` and `transcript_id`.  

**Version mismatches**  
GTF annotations must match the reference genome version used in alignment.  

**Mixed GFF/GTF use**  
Confusion between GTF (rigid) and GFF3 (flexible) formats can cause pipeline errors.  
</div>
&nbsp;
</div>


### File validation

Validate GTF annotations for format correctness, genome build consistency, and completeness before RNA-seq analysis.  

<div class="usa-accordion " >

{% include accordion title="Compression" class=" " controls="gtf-1" icon=false %}
<div id="gtf-1" class="accordion_content" markdown='1' hidden>
```bash
# Compress
gzip annotations.gtf
bgzip annotations.gtf

# Decompress
gunzip annotations.gtf.gz
bgzip -d annotations.gtf.gz
```
</div>

{% include accordion title="File integrity" class=" " controls="gtf-2" icon=false %}
<div id="gtf-2" class="accordion_content" markdown='1' hidden> 
```bash 
md5sum annotations.gtf > annotations.gtf.md5 
md5sum -c annotations.gtf.md5     # confirm integrity after transfer
``` 
</div>

{% include accordion title="Format validation" class=" " controls="gtf-3" icon=false %}
<div id="gtf-3" class="accordion_content" markdown='1' hidden> 
Use `gffread` to validate the format:
```bash
gffread annotations.gtf -E -T -o validated.gtf
```
Writes a normalized GTF to `validated.gtf` (not a format change). This is strict validation: reports problems to STDERR or exits non-zero on fatal errors.
- `-E` enables stricter checks and emits warnings/errors. 
- `-T` forces GTF output (without `-T`, output is GFF3).
</div>

{% include accordion title="Format conversion" class=" " controls="gtf-4" icon=false %}
<div id="gtf-4" class="accordion_content" markdown='1' hidden> 
Convert between GTF and GFF formats:
```bash
# Convert **GTF → GFF3**
gffread annotations.gtf -o annotations.gff3
# Convert **GFF3 → GTF**
gffread annotations.gff3 -T -o annotations.gtf
```
</div>

{% include accordion title="Genome build consistency" class=" " controls="gtf-5" icon=false %}
<div id="gtf-5" class="accordion_content" markdown='1' hidden> 
Check annotation matches reference FASTA. Ensure chromosome naming conventions match (e.g., `chr1` vs `1`).
```bash
grep -v "^#" annotations.gtf | cut -f1 | sort | uniq | head
samtools faidx reference.fa
```
Compare/assess annotation consistency with `gffcompare`:
```bash
gffcompare -r reference.gtf -o qc annotations.gtf       # outputs: qc.stats (summary), qc.annotated.gtf (classified features)
```
Compares your GTF against a trusted reference to detect mismatches/novel features.
</div>
</div>

## GFF

**General Feature Format is a tab-delimited format for describing genomic features.** GFF3 is the standardized, widely used version. 
Unlike [GTF](#gtf), GFF3 supports hierarchical annotations and a broader range of feature types, and is often used in genome browsers and annotation databases.  

| **Data Type** | **Components**                              | **Molecule** | **Application / Analysis Step**                 |
|---------------|---------------------------------------------|--------------|-------------------------------------------------|
| annotation    | genes, transcripts, exons, regulatory sites | DNA, RNA     | genome browsers, visualization (e.g., JBrowse, IGV) |
| genome model  | gene models from Ensembl, RefSeq, or NCBI   | DNA, RNA     | input for comparative genomics and annotation   |
| processed data| flexible annotation files                   | DNA, RNA     | interoperability between tools and databases    |

*GFF is a gene annotation format. It describes genomic features (genes, transcripts, exons) mapped to DNA coordinates. 
Even though features represent RNA molecules (like mRNA), they are anchored to the DNA genome.*

### Example GFF3 file

<details markdown="1"><summary><b>annotation records in GFF3 format</b></summary>
```markdown
##gff-version 3
chr1    RefSeq  gene        11869   14409   .   +   .   ID=gene1;Name=DDX11L1
chr1    RefSeq  mRNA        11869   14409   .   +   .   ID=transcript1;Parent=gene1;Name=DDX11L1-201
chr1    RefSeq  exon        11869   12227   .   +   .   ID=exon1;Parent=transcript1
```
The header line declares the file format version (`##gff-version 3`). 
Each subsequent feature line contains **9 tab-delimited fields**, similar to [GTF](#gtf) format. 
The final column holds **attributes** in `key=value` pairs, separated by semicolons (e.g., `ID`, `Parent`, `Name`). 
Feature relationships are defined explicitly: `gene → mRNA → exon`, where child features reference their parent via the `Parent` tag (e.g., mRNA belongs to a gene, exon belongs to an mRNA).  
</details>


### Format structure

GFF3 files are **tab-delimited with 9 required fields**, like GTF:  

```bash
   #1       #2    #3      #4    #5    #6     #7    #8                 #9
seqid   source  type   start   end score strand phase         attributes
chr1    RefSeq  gene   11869   14409   .   +   .   ID=gene1;Name=DDX11L1
```
- (col 1) **seqid**: reference sequence name (e.g., chromosome or contig); must match IDs in the ref. FASTA
- (col 2) **source**: annotation source (program or database that generated the feature: `RefSeq`, `Ensembl`) 
- (col 3) **type**: feature type, ideally from Sequence Ontology (e.g., `gene`, `mRNA`, `exon`, `CDS`)
  - **hierarchy:** features are connected via attributes (e.g., `gene → mRNA → exon` using `ID` and `Parent`)
- (col 4-5): **start** coordinate of the feature; **end** coordinate of the feature; both 1-based, inclusive; 
  - *(see [Genomic coordinate system](#genomic-coordinate-system) section)*
- (col 6) **score**: numeric score (e.g., alignment quality); use `.` if not applicable
- (col 7) **strand**: feature strand: `+` (forward), `-` (reverse), or `.` (unstranded)  
- (col 8) **phase**: for coding features (`CDS`):&ensp; `0` → starts at first base of a codon; `1` → starts at second base; `2` → starts at third base; `.` → not applicable (non-coding features)  
- (col 9) **cattributes** : `key=value` pairs separated by semicolons. Typical keys:  
  - `ID` → unique feature identifier  
  - `Parent` → references parent feature (defines hierarchy)  
  - `Name` → human-readable label (e.g., gene symbol)  
  - additional tags (e.g., `biotype`, `Note`) depending on source  

<div class="highlighted highlighted--error ">
<div class="highlighted__body"  markdown="1"><h4>Common issues</h4></div>
<div style="margin-left: 1.3em; margin-right: 1.3em;" markdown="1">
**Format confusion**  
Mixing GTF and GFF3 can break pipelines - attribute syntax differs.  

**Missing attributes**  
If IDs or Parent fields are missing, the hierarchy cannot be reconstructed.  

**Genome version mismatch**  
Annotations must match reference genome build.  

**Improper sorting**  
Some tools require sorted GFF3 (by `seqid` and `start` position).  
</div>
&nbsp;
</div>


### File validation

Validate GFF3 annotations for format compliance, hierarchy consistency, and genome build compatibility.  

<div class="usa-accordion " >

{% include accordion title="Compression" class=" " controls="gff-1" icon=false %}
<div id="gff-1" class="accordion_content" markdown='1' hidden>
```bash
# Compress
gzip annotations.gff3
bgzip annotations.gff3

# Decompress
gunzip annotations.gff3.gz
bgzip -d annotations.gff3.gz
```
</div>

{% include accordion title="File integrity" class=" " controls="gff-2" icon=false %}
<div id="gff-2" class="accordion_content" markdown='1' hidden> 
```bash 
md5sum annotations.gff3 > annotations.gff3.md5 
md5sum -c annotations.gff3.md5      # confirm integrity after transfer
``` 
</div>

{% include accordion title="Format validation" class=" " controls="gff-3" icon=false %}
<div id="gff-3" class="accordion_content" markdown='1' hidden> 
Validate GFF3 structure with `gt gff3validator` (from GenomeTools):
```bash
gt gff3validator annotations.gff3
```
Or convert/validate with gffread:
```bash
gffread annotations.gff3 -E -o validated.gff3
```
</div>

{% include accordion title="Annotation consistency" class=" " controls="gff-4" icon=false %}
<div id="gff-4" class="accordion_content" markdown='1' hidden> 
Compare your GFF3 against a reference with `gffcompare`:
```bash
gffcompare -r reference.gff3 -o qc annotations.gff3
```
Ensure feature hierarchies (`gene → mRNA → exon`) are valid and complete.
</div>

</div>


## BED

**Browser Extensible Data is a lightweight tab-delimited format for representing genomic intervals.** 
It is widely used for storing regions of interest (e.g., peaks, annotation tracks) and for visualization in genome browsers.  

| **Data Type** | **Components**                          | **Molecule** | **Application / Analysis Step**                     |
|---------------|-----------------------------------------|--------------|-----------------------------------------------------|
| intervals     | genomic coordinates                     | DNA          | defining regions of interest (e.g., peaks, motifs)  |
| annotation    | genes, promoters, regulatory sites      | DNA          | track visualization in genome browsers (UCSC, IGV)  |
| processed data| outputs from peak callers (e.g., MACS2) | DNA          | ChIP-seq, ATAC-seq, DNase-seq analysis              |


### Example BED file

<details markdown="1"><summary><b>BED3 (basic interval)</b></summary>
```markdown
chr1    11868   12227
chr1    12612   12721
```
- Three required fields: `chrom`, `chromStart`, `chromEnd`
- Coordinates are 0-based, half-open (start is 0-based, end is 1-based)
</details> 

<details markdown="1"><summary><b>BED6 (with names and strand)</b></summary> 
```markdown 
chr1 11868 12227 exon1 0 + 
chr1 12612 12721 exon2 0 - 
``` 
- Adds `name`, `score`, `strand` fields. 
- Common for gene models, peaks, regulatory features. 
</details> 

<details markdown="1"><summary><b>BED12 (full format)</b></summary> 
```markdown 
chr1 11868 14409 transcript1 0 + 11868 14409 0,0,255 2 359,255 0,2285 
``` 
- Used to describe complex features like transcripts with exons/introns. 
- Includes block count, block sizes, and block starts. 
</details>


### Format structure

BED files can contain 3–12 tab-delimited fields:  
```bash
   #1    #2    #3   #4       #5     #6    #7         #8        #9  #10     #11      #12
chrom start   end name    score strand thickStart thickEnd itemRgb count sizes   starts
chr1  11868 14409 transcript1 0   +    11868      14409    0,0,255 2     359,255 0,2285 
```

- **Required (BED3):**  
  - (col 1) **chrom**: chromosome/contig name  
  - (col 2) **chromStart**: interval start (0-based, inclusive)^  
  - (col 3) **chromEnd**: interval end (1-based, exclusive)^ <br>
^*(see [Genomic coordinate system](#genomic-coordinate-system) section)*  

- **Optional fields (BED4–12):**  
  - (col 4) **name**: feature name  
  - (col 5) **score**: integer 0–1000, often unused  
  - (col 6) **strand**: `+`, `-`, or `.`  
  - (col 7) **thickStart / thickEnd**: regions to highlight (e.g., coding sequence)  
  - (col 8) **itemRgb**: RGB color for visualization  
  - (col 9) **blockCount / blockSizes / blockStarts**: for multi-block features (e.g., exons in transcripts)  

<div class="highlighted highlighted--error ">
<div class="highlighted__body"  markdown="1"><h4>Common issues</h4></div>
<div style="margin-left: 1.3em; margin-right: 1.3em;" markdown="1">
**Coordinate confusion**  
BED uses 0-based, half-open intervals; mixing with 1-based formats ([GTF](#gtf)/[GFF](#gff)/[VCF](#vcf--bcf)) causes off-by-one errors.  

**Mismatched genome build**  
Intervals must match the reference genome assembly used in analysis.  

**Missing fields**  
Some tools require BED6 or BED12, not just BED3.  

**Improper sorting**  
Many pipelines expect intervals sorted by chromosome and start position.  
</div>
&nbsp;
</div>


### File validation

Check BED files for coordinate correctness, format compliance, and genome build consistency.  

<div class="usa-accordion " >

{% include accordion title="Compression" class=" " controls="bed-1" icon=false %}
<div id="bed-1" class="accordion_content" markdown='1' hidden>
```bash
# Compress
gzip intervals.bed
bgzip intervals.bed

# Decompress
gunzip intervals.bed.gz
bgzip -d intervals.bed.gz
```
</div>

{% include accordion title="File integrity" class=" " controls="bed-2" icon=false %}
<div id="bed-2" class="accordion_content" markdown='1' hidden> 
```bash 
md5sum intervals.bed > intervals.bed.md5 
md5sum -c intervals.bed.md5       # confirm integrity after transfer
``` 
</div>

{% include accordion title="Format validation" class=" " controls="bed-3" icon=false %}
<div id="bed-3" class="accordion_content" markdown='1' hidden> 
Use `bedtools` or `bedops` to check format and sort:
```bash
bedtools sort -i intervals.bed > intervals.sorted.bed
bedops --check-bed intervals.bed
```
</div>

{% include accordion title="Genome build consistency" class=" " controls="bed-4" icon=false %}
<div id="bed-4" class="accordion_content" markdown='1' hidden> 
Check chromosomes match reference FASTA:
```bash
cut -f1 intervals.bed | sort -u | head
samtools faidx reference.fa
```
Compare BED seqids with reference FASTA headers.
</div>

</div>



## VCF / BCF

**Variant Call Format is a text-based format for storing genomic variants** (SNPs, indels, structural variants) along with genotypes and annotations. 
**BCF** is the binary, compressed equivalent of **VCF**, optimized for efficient storage and indexing for fast querying.  

| **Data Type** | **Components**                           | **Molecule** | **Application / Analysis Step**                        |
|---------------|------------------------------------------|--------------|--------------------------------------------------------|
| variants      | SNPs, indels, structural variants        | DNA          | results of variant calling (e.g., GATK, bcftools)      |
| genotypes     | per-sample alleles and quality metrics   | DNA          | population genetics, GWAS, clinical variant analysis   |
| annotations   | INFO fields (e.g., functional effect)    | DNA          | interpretation, filtering, prioritization              |


### Example VCF file

<details markdown="1"><summary><b>VCF (header + variants)</b></summary>
```markdown
##fileformat=VCFv4.2
##source=ExampleCaller
##reference=GRCh38
#CHROM  POS     ID      REF ALT QUAL FILTER INFO
chr1    11869   rs1     G   A   60   PASS   DP=100;AF=0.5
chr1    12227   .       T   C   50   q10    DP=80;AF=0.4
```
**Header lines** start with `##`, describing metadata and format version. Column header line starts with  a single `#`, defining 8 fields. 
In **data lines**, each row coressponds to one variant record.
</details>

<div class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">BCF is a binary file</h4>
Unlike VCF (plain text), **BCF** is a binary, compressed format optimized for storage and speed. 
It cannot be opened in a text editor; use `bcftools view` for on-the-fly conversion to VCF or for content preview (see [File validation](#file-validation-6) section for example commands).  
</div>
</div>

### Format structure

VCF files contain a header section and a variant records section. 
```bash
#1      #2      #3      #4  #5  #6   #7     #8
#CHROM  POS     ID      REF ALT QUAL FILTER INFO
chr1    11869   rs1     G   A   60   PASS   DP=100;AF=0.5
```

**Mandatory columns in variant records:**
- (col 1) **CHROM**: reference sequence name (chromosome/contig)  
- (col 2) **POS**: 1-based position of the variant  
- (col 3) **ID**: variant identifier (e.g., dbSNP rsID)  
- (col 4) **REF**: reference allele  
- (col 5) **ALT**: alternate allele(s)  
- (col 6) **QUAL**: quality score of the variant call  
- (col 7) **FILTER**: filter status (e.g., `PASS`, `q10`)  
- c(ol 8) **INFO**: `key=value` pairs describing variant annotations (e.g., `DP`=depth, `AF`=allele frequency)  

**Optional additional columns:**
- **FORMAT**: describes the format of per-sample fields  
- **Sample columns**: genotype and per-sample information (e.g., `GT`, `GQ`, `DP`)  

<div class="highlighted highlighted--error ">
<div class="highlighted__body"  markdown="1"><h4>Common issues</h4></div>
<div style="margin-left: 1.3em; margin-right: 1.3em;" markdown='1'>
**Reference mismatch**  
VCF must be generated and interpreted with the same reference genome.  

**Incorrect chromosome naming**  
`chr1` vs `1` mismatches can cause tool failures.  

**Missing index**  
Unindexed `.vcf.gz` or `.bcf` cannot be used for random access.  

**Malformed INFO fields**  
Improper key=value formatting breaks parsers.  

**Multiallelic variants**  
Some tools struggle with sites containing multiple alternate alleles.  
</div>
&nbsp;
</div>


### File validation

Validate VCF/BCF files for **integrity**, **indexing**, and **annotation consistency**.  

<div class="usa-accordion " >

{% include accordion title="Compression" class=" " controls="vcf-1" icon=false %}
<div id="vcf-1" class="accordion_content" markdown='1' hidden>
```bash
# Compress
bgzip variants.vcf

# Decompress
bgzip -d variants.vcf.gz
```
</div>

{% include accordion title="Indexing" class=" " controls="vcf-2" icon=false %}
<div id="vcf-2" class="accordion_content" markdown='1' hidden>
```bash 
# Create index for VCF/BCF 
tabix -p vcf variants.vcf.gz 
bcftools index variants.bcf 
``` 
Indexes (`.tbi` or `.csi`) are required for random access. 
</div>

{% include accordion title="File integrity" class=" " controls="vcf-3" icon=false %}
<div id="vcf-3" class="accordion_content" markdown='1' hidden> 
```bash 
md5sum variants.vcf.gz > variants.vcf.gz.md5 
md5sum -c variants.vcf.gz.md5       # confirm integrity after transfer
``` 
</div>

{% include accordion title="Format validation" class=" " controls="vcf-4" icon=false %}
<div id="vcf-4" class="accordion_content" markdown='1' hidden> 
Validate VCF with `bcftools`:
```bash
bcftools view variants.vcf.gz | head
bcftools stats variants.vcf.gz > vcf.stats
plot-vcfstats -p plots/ vcf.stats
```
Or check structural correctness using `vcftools` suite:
```bash
vcf-validator variants.vcf.gz
```
</div>

{% include accordion title="Filtering & Conversion" class=" " controls="vcf-5" icon=false %}
<div id="vcf-5" class="accordion_content" markdown='1' hidden> 
```bash 
# Extract only SNPs 
bcftools view -v snps variants.vcf.gz > snps.vcf
# Convert VCF to BCF
bcftools view -Ob -o variants.bcf variants.vcf.gz
#Convert BCF to VCF
bcftools view variants.bcf > variants.vcf
```
</div>

</div>




## Practical guidance

The choice of file format depends on the stage of analysis and the type of data being processed. 
Understanding what each format stores and how it should be validated, indexed, or converted is essential for building reliable bioinformatics workflows.  

<div class="usa-accordion " >
{% include accordion title="Quick Quiz: Check your understanding" controls="quiz-formats" expanded=false class="question" icon=true %}
<div id="quiz-formats" class="accordion_content" markdown='1'>
Now that you've explored standard file formats, their structure, and their applications, 
try these short questions to test your knowledge and avoid common pitfalls when working with genomic data.

{% include question qid="1,2,3,4,5,6,7,8" %}
</div>
</div>

<div class="process-list ul" markdown="1">

### Genomic coordinate system

Different annotation formats use different genomic coordinate conventions. Mixing them without conversion leads to **off-by-one errors**. 
Always check whether a format is **0-based or 1-based**, and whether intervals are **closed or half-open**, before integrating files across tools.  

| **Format**   | **Coordinate system** | **Start** | **End**   | **Notes** |
|--------------|-----------------------|-----------|-----------|-----------|
| **BED**      | 0-based, half-open    | inclusive | exclusive | `chromStart` is 0-based; <br>`chromEnd` is 1-based. <br>`interval_len = end – start` |
| **GTF/GFF3** | 1-based, closed       | inclusive | inclusive | Both start and end are 1-based. `interval_len = end – start + 1` |
| **VCF**      | 1-based, left-aligned | inclusive | inclusive | Variants are anchored at a single 1-based position; indels extend coordinates. |


Consider a genomic feature spanning **bases 11869–12227** on chromosome 1 (forward strand).  
Here’s how it looks in different formats:  

```bash
# BED covers positions 11869–12227 (start = 11868 is 0-based; end = 12227 is exclusive).
chr1    11868    12227    exon1    0    +  

# GTF explicitly spans 11869–12227, both inclusive.
chr1    source    exon    11869    12227    .    +    .    gene_id "gene1"; transcript_id "tx1";

# VCF represents a variant at position 11869 (reference allele A, alternate allele T).
chr1    11869    .    A    T    60    PASS    .
```

**Key difference:**  
- In BED, the same region starts at 11868 (0-based indexing) and ends at 12227 (exclusive).  
- In GTF, the interval is written exactly as 11869–12227 (inclusive).  
- In VCF, only a single 1-based position is specified (e.g., a SNP at 11869).  


<div class="usa-accordion " >

{% include accordion title="Converting between coordinate systems" class="tip " controls="coordinats" icon=true %}
<div id="coordinats" class="accordion_content" markdown='1' hidden>
1. Identify the coordinate system used by each format before processing. 
- When converting **BED → GTF/GFF3/VCF**, add **+1** to the start coordinate (end remains unchanged).  
- When converting **GTF/GFF3/VCF → BED**, subtract **1** from the start coordinate (end remains unchanged).  

2. Use trusted tools for conversion rather than manual editing:  
- `bedtools slop` - adjust intervals programmatically  
- UCSC `liftOver` - convert between assemblies and correct coordinate system automatically 

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
Coordinate corrections are usually done in `BED` format. 
Other formats (`GTF`, `GFF3`, `VCF`) are first converted to `BED`, adjusted, and if needed, converted back. 
Tools like `bedops gff2bed` or `bedops vcf2bed` help with this workflow.
</div></div>

**BED → GTF/GFF3/VCF (0-based → 1-based):** Add **+1** to the start coordinate.  
```bash
bedtools slop -i input.bed -g genome.sizes -b 0 -l 1 -r 0 > converted_1based.bed
```

**GTF/GFF3/VCF → BED (1-based → 0-based):** Subtract 1 from the start coordinate.
```bash
bedtools slop -i input.gtf -g genome.sizes -b 0 -l -1 -r 0 > converted_0based.bed
```

**Assembly conversion with UCSC liftOver:** Coordinate system adjusted automatically.
```bash
liftOver input.bed reference.chain.gz output_ref.bed unMapped.bed
```
- `reference.chain.gz` - chain file describing mapping from source to target assembly
- `output_ref.bed` - successfully converted coordinates in the target assembly
- `unMapped.bed` - intervals that could not be mapped (due to gaps, assembly differences, etc.)
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