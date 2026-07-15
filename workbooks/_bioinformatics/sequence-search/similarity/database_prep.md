---
title: Creating Local Sequence Databases for BLAST
description: "Learn how to prepare nucleotide and protein FASTA files, build custom BLAST databases, extract sequences, and verify database contents."
svg: /genomics.svg
name: "Rick Masonbrink"

header:
  overlay_image: 07-wrangling/assets/img/07_data_acquisition_banner.png
index: 
order: 2
wg: Bioinformatics
type: interactive tutorial
---

# Creating Local Sequence Databases for BLAST

## Overview

BLAST searches can be run against public databases maintained by the National Center for Biotechnology Information, or against custom databases created from locally available sequences.

Custom BLAST databases are useful when working with:

* newly assembled genomes;
* predicted transcriptomes or proteomes;
* unpublished sequences;
* organism-specific reference collections;
* curated gene families;
* repeated searches against the same dataset;
* high-throughput or automated workflows.

In this tutorial, you will create local nucleotide and protein BLAST databases, inspect their contents, retrieve sequences, and run a test search.

## Learning objectives

By the end of this tutorial, you should be able to:

1. Distinguish between nucleotide and protein BLAST databases.
2. Inspect a FASTA file before database construction.
3. Create a local BLAST database with `makeblastdb`.
4. Preserve sequence identifiers using `-parse_seqids`.
5. Verify a database using `blastdbcmd`.
6. Retrieve individual sequences from a BLAST database.
7. Run a test BLAST search against a custom database.

## Prerequisites

Before beginning this tutorial, you should be comfortable with:

* navigating directories at the command line;
* viewing and editing text files;
* recognizing FASTA-formatted sequence files;
* running basic Linux commands;
* using software modules

## Software requirements

This tutorial requires the NCBI BLAST+ command-line tools. There are five flavors of BLAST, each with its own query and database type. The query type and database type jointly determine which BLAST program should be used. For example, blastx translates a nucleotide query and searches a protein database, whereas tblastn searches a translated nucleotide database using a protein query.


| Query type            | Database type         | Program   |
| --------------------- | --------------------- | --------- |
| Nucleotide            | Nucleotide            | `blastn`  |
| Protein               | Protein               | `blastp`  |
| Translated nucleotide | Protein               | `blastx`  |
| Protein               | Translated nucleotide | `tblastn` |
| Translated nucleotide | Translated nucleotide | `tblastx` |


Verify that BLAST+ is available:
```bash
module load blast+

makeblastdb -version
makeblastdb: 2.15.0+
 Package: blast 2.15.0, build Oct 19 2023 13:35:57

blastdbcmd -version
blastdbcmd: 2.15.0+
 Package: blast 2.15.0, build Oct 19 2023 13:35:57
```

## Introduction

This tutorial uses four FASTA files:

```text
# Daktulosphaira vitifoliae genome and predicted proteome
https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_025091365.1/


#Vitis vinifera genome and predicted proteome
https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_030704535.1/
```

The proteome files contains amino acid sequences, while the genome file contains nucleotide sequences.

A typical protein FASTA file looks like:

```text
>protein_001
MSTNPKPQRKTKRNTNRRPQDVKFPGGGQIVGGVLTALA...
>protein_002
MALWMRLLPLLALLALWGPGPGAGSLQPLALEGSLQK...
```

A typical nucleotide FASTA file looks like:

```text
>scaffold_001
ATGCGTACGTAGCTAGCTAGCTAGCTAGCTAGCTAGC...
>scaffold_002
GGCATCGATCGATCGATCGATCGATCGATCGATCGA...
```



## 1. Create a working directory

Create a directory for the tutorial:

```bash
mkdir -p blast_database_tutorial
cd blast_database_tutorial
```

Download and rename the FASTA files
```bash
#Daktulosphaira vitifoliae genome
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCF/025/091/365/GCF_025091365.1_ASM2509136v1/GCF_025091365.1_ASM2509136v1_genomic.fna.gz
#Daktulosphaira vitifoliae predicted proteome
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCF/025/091/365/GCF_025091365.1_ASM2509136v1/GCF_025091365.1_ASM2509136v1_protein.faa.gz
#Vitis vinifera predicted proteome
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCF/030/704/535/GCF_030704535.1_ASM3070453v1/GCF_030704535.1_ASM3070453v1_protein.faa.gz
#Vitis vinifera genome
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCF/030/704/535/GCF_030704535.1_ASM3070453v1/GCF_030704535.1_ASM3070453v1_genomic.fna.gz

#extract proteome and genome fasta files
gunzip *gz

mv GCF_025091365.1_ASM2509136v1_genomic.fna DvitifoliaeGenome.fasta
mv GCF_025091365.1_ASM2509136v1_protein.faa DvitifoliaeProteome.fasta
mv GCF_030704535.1_ASM3070453v1_protein.faa VviniferaProteome.fasta
mv GCF_030704535.1_ASM3070453v1_genomic.fna VviniferaGenome.fasta 
```

## 2. Inspect the input FASTA files

Before building a database, inspect the input file to confirm its sequence type and formatting.

View the first several lines of a protein file:

```bash
head VviniferaProteome.fasta
```

Count the number of protein sequences:

```bash
grep -c '^>' VviniferaProteome.fasta
```

Inspect a nucleotide file:

```bash
head DvitifoliaeGenome.fasta
```

Count the number of nucleotide sequences:

```bash
grep -c '^>' DvitifoliaeGenome.fasta
```


## 3. Choose the correct database type

BLAST databases must be created as either nucleotide or protein databases.

Use:

```text
-dbtype prot
```

for amino acid sequences.

Use:

```text
-dbtype nucl
```

for DNA or RNA sequences.

The database type must match both the input sequences and the BLAST program used later.

| Input sequences | Database type | Common search programs |
| --------------- | ------------- | ---------------------- |
| Protein         | `prot`        | `blastp`, `blastx`     |
| Nucleotide      | `nucl`        | `blastn`, `tblastn`    |

## 4. Create nucleotide BLAST databases

Create databases from the nucleotide FASTA files:

```bash
makeblastdb \
-in DvitifoliaeGenome.fasta \
-dbtype nucl \
-parse_seqids \
-out DvitifoliaeGenomeDB

makeblastdb \
-in VviniferaGenome.fasta \
-dbtype nucl \
-parse_seqids \
-out VviniferaGenomeDB
```

### Command options

* `-in DvitifoliaeGenome.fasta` specifies the input FASTA file.
* `-dbtype nucl` creates a nucleotide database.
* `-parse_seqids` allows sequences to be retrieved by their FAST identifiers.
* `-out DvitifoliaeGenomeDB` sets the output database prefix.

The value supplied to `-out` is a prefix, not a directory name.


## 5. Create protein BLAST databases

Create a databases from the protein FASTA files:

```bash
makeblastdb \
-in DvitifoliaeProteome.fasta \
-dbtype prot \
-parse_seqids \
-out DvitifoliaeProteomeDB

makeblastdb \
-in VviniferaProteome.fasta \
-dbtype prot \
-parse_seqids \
-out VviniferaProteomeDB
```


### Checkpoint

You should now have four database prefixes:

```text
DvitifoliaeGenomeDB
DvitifoliaeProteomeDB
VviniferaGenomeDB
VviniferaProteomeDB
```

Note that `makeblastdb` creates multiple index files, but specify only the prefix when specifying a BLAST database. 

Correct:

```text
-db DvitifoliaeProteomeDB
```

Incorrect:

```text
-db DvitifoliaeProteomeDB.phr
```

## 6. Inspect database information

Use `blastdbcmd` to display information about the protein database:

```bash
blastdbcmd \
  -db DvitifoliaeProteomeDB \
  -info
```

Inspect the nucleotide database:

```bash
blastdbcmd \
  -db DvitifoliaeGenomeDB \
  -info
```

## 7. List database sequence identifiers

List all identifiers in the protein database:
Note tha the sequence identifier in a fasta file is the text after `>` but before the first whitespace.
```bash
blastdbcmd \
  -db DvitifoliaeProteomeDB \
  -entry all \
  -outfmt '%a'
```

List all identifiers from the nucleotide database:

```bash
blastdbcmd \
  -db DvitifoliaeGenomeDB \
  -entry all \
  -outfmt '%a'
```

Other useful output fields include:

| Format code | Meaning                                 |
| ----------- | --------------------------------------- |
| `%a`        | sequence accession or parsed identifier |
| `%t`        | sequence title                          |
| `%l`        | sequence length                         |
| `%s`        | sequence                                |
| `%f`        | FASTA-formatted sequence                |

Display identifiers, titles, and lengths:

```bash
blastdbcmd \
  -db DvitifoliaeProteomeDB \
  -entry all \
  -outfmt '%a\t%l\t%t'
```

## 8. Retrieve sequences from a database

Choose an identifier from the previous command and retrieve its sequence:

```bash
blastdbcmd \
  -db DvitifoliaeProteomeDB \
  -entry XP_050549211.1
```

Save example sequences from each sequence file

```bash
blastdbcmd \
  -db DvitifoliaeProteomeDB \
  -entry XP_050524263.1 \
  -outfmt '%f' \
  -out XP_050524263.1.fasta

blastdbcmd \
  -db DvitifoliaeGenomeDB \
  -entry NW_026099572.1 \
  -outfmt '%f' \
  -out NW_026099572.1.fasta

```


## 9. Run a protein to genome search with tBLASTn

Run a `tblastn`  of our extracted D.vitifoliae protein: `XP_050524263.1` against the V. vinifera genome database:

```bash
tblastn \
  -query XP_050524263.1.fasta \
  -db VviniferaGenomeDB \
  -out XP_050524263.1_VviniferaGenomeDB_hits.tsv \
  -outfmt 6
```

Inspect the results:

```bash
head XP_050524263.1_VviniferaGenomeDB_hits.tsv
```

The default tabular output contains the following columns:

```text
qseqid
sseqid
pident
length
mismatch
gapopen
qstart
qend
sstart
send
evalue
bitscore
```

This tabular output can also be modified to include other descriptive columns in blast output. 
```bash
#default writes this
  -outfmt '6 qseqid sseqid pident length mismatch gapopen qstart qend sstart send evalue bitscore' \

#add query coverage and subject title to outfmt 6.
  -outfmt '6 qseqid sseqid pident length mismatch gapopen qstart qend sstart send evalue bitscore stitle qcovs'
```


## 10. Run a protein to protein search with BLASTp

Run a `blastp`  of our extracted D.vitifoliae protein: `XP_050524263.1` against the V. vinifera proteome database, retrieving only the top ten high quality hits.

```bash
blastp \
  -query XP_050524263.1.fasta \
  -db VviniferaProteomeDB \
  -out XP_050524263.1_VviniferaProteomeDB_hits.tsv \
  -outfmt 6 \
  -evalue 1e-5 \
  -max_target_seqs 10
```

## 11. Run a nucleotide to nucleotide search with BLASTn


Run `blastn` of D. vitifoliae contig `NW_026099572.1` against the Vvinifera nucleotide database using `-num_threads`.

```bash
blastn \
  -query NW_026099572.1.fasta  \
  -db VviniferaGenomeDB \
  -out NW_026099572.1_VviniferaGenome_hits.tsv \
  -outfmt 6 \
  -num_threads 12
```


## 12. Updating or rebuilding a BLAST database

BLAST databases do not automatically update when the original FASTA file changes.

After adding, removing, or editing sequences, rebuild the database:

```bash
makeblastdb \
  -in DvitifoliaeProteome_updated.fasta \
  -dbtype prot \
  -parse_seqids \
  -out DvitifoliaeProteome_updated
```

## 13. Resource considerations

Creating ordinary BLAST databases is generally not memory intensive, but requirements increase with the size of the input FASTA file.

Consider:

* available disk space;
* temporary storage limits;
* filesystem quotas;
* input file size;
* whether the database will be shared;
* whether many jobs will access the database simultaneously.

## 14. Summary

In this tutorial, you:

* inspected nucleotide and protein FASTA files;
* selected the correct BLAST database type;
* created custom databases with `makeblastdb`;
* verified database contents with `blastdbcmd`;
* listed and retrieved database sequences;
* ran test `blastp`, `tblastn`, and `blastn` searches;

The essential protein database command is:

```bash
makeblastdb \
  -in proteins.fasta \
  -dbtype prot \
  -parse_seqids \
  -out proteinsDB
```

The essential nucleotide database command is:

```bash
makeblastdb \
  -in genome.fasta \
  -dbtype nucl \
  -parse_seqids \
  -out genomeDB
```

Verify either database with:

```bash
blastdbcmd -db DATABASE_PREFIX -info
```

## 15. Knowledge check

1. Which `-dbtype` value should be used for amino acid sequences?
2. Which `-dbtype` value should be used for genomic DNA?
3. Why is `-parse_seqids` useful?
4. What should be supplied to the BLAST `-db` option?
5. How can you confirm the number of sequences in a database?
6. What must you do after modifying the original FASTA file?

## 16. Exercises

### Exercise 1: Build a protein database

Create a protein database from a FASTA file of your choice.

Verify:

* the database type;
* the number of sequences;
* the total sequence length.

### Exercise 2: Retrieve a protein

Select one sequence identifier and retrieve the corresponding sequence in FASTA format.

### Exercise 3: Run a BLAST search

Identify proteins in the V. vinifera proteome with similarity the D. vitifoliae proteome. Examine whether the strongest protein hit also identifies a corresponding region in the V. vinefera genome.  


## 17. Additional resources

* NCBI BLAST+ command-line documentation
* `makeblastdb -help`
* `blastdbcmd -help`
* SCINet workbook command-line and software-environment tutorials


