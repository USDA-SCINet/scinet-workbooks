---
title: Useful text manipulation commands
description: Tools for quickly and efficiently processing large amounts of text data
index: 3
type: introduction
author: [Arun Seetharam, Aleksandra Badaczewska]
---

## Overview

Manipulating text files in the command line is a powerful and efficient method for processing large amounts of text data. 
There are a variety of text manipulation programs available in the terminal that allow users to quickly and efficiently process large amounts of text data. These programs offer a wide range of capabilities, including searching for patterns, transforming text, sorting lines, removing duplicates, and counting characters, words, and lines.

In this section, we will discuss some of the most popular and useful command line text manipulation programs.

## GREP - search pattern

Some typical scenarios to use `grep`:
  -	Counting number of sequences in a multi-fasta sequence file
  -	Get the header lines of fasta sequence file
  -	Find a matching motif in a sequence file
  -	Find restriction sites in sequence(s)
  -	Get all the Gene IDs from a multi-fasta sequence files 
  - and many more.

There are various options available for this command:

{% include table caption="Useful grep options" content="| Argument  | Function                                                          |
|----------:|:------------------------------------------------------------------|
| `-v`      | inverts the match or finds lines NOT containing the pattern.      |
| `--color` | colors the matched text for easy visualization                    |
| `-F`      | interprets the pattern as a literal string.                       |
| `-H`,`-h` | print, don't print the matched filename                           |
| `-i`      | ignore case for the pattern matching.                             |
| `-l`      | lists the file names containing the pattern (instead of match).   |
| `-n`      | prints the line number containing the pattern (instead of match). |
| `-c`      | counts the number of matches for a pattern                        |
| `-o`      | only print the matching pattern 			                        |
| `-w`      | forces the pattern to match an entire word.                       |
| `-x`      | forces patterns to match the whole line.                          |" %}

With options, syntax is

```bash
grep [OPTIONS] PATTERN FILENAME
```

{% include table caption="grep task examples" content="| COMMAND SYNTAX | TASK | EXAMPLE |
| -------------- | ----------- | ------- |
| `grep <PATTERN> <FILE>` | Search for a pattern in a file. | `grep 'version' file.txt` |
| `grep <PATTERN> <FILE1> <FILE2>` | Search for a pattern in multiple files. | `grep 'version' file1.txt file2.txt` |
| `grep -r <PATTERN> <DIR>` | Search recursively in all files in a directory. | `grep -r 'version' THIS_FOLDER` |
| `grep -n <PATTERN> <FILE>` | Show line numbers for matches. | `grep -n 'version' file.txt` |
| `grep -o <PATTERN> <FILE>` | Show only the matching portion of the line. | `grep -o 'version' file.txt` |" %}

Now let's use `grep` command to do some simple jobs with the sequences:

<div class="usa-accordion">

{% include accordion title="Counting sequences" controls="grep-1" %}
<div id="grep-1" class="accordion_content"   markdown='1' hidden>

By `FASTA` format definition, we know that number of sequences in a file should be equal to the number of description lines. So by counting `>` in file, you can count the number of sequences. This can be done using counting option of the `grep` with its count option `-c`.
```bash
grep -c ">" FILENAME
```
However, note that if the deflines somehow have `>` more than once, it will mess up the count! to be safe, you can use:
```bash
grep -c "^>" FILENAME
```

**Count the number of sequences AT_cDNA.fa and RefSeq.faa**
```bash
grep -c ">" AT_cDNA.fa
grep -c ">" RefSeq.faa
```

</div>

{% include accordion title=" Looking for genes or features" controls="grep-2" %}
<div id="grep-2" class="accordion_content"   markdown='1' hidden>

If you are looking for information about the sequences, you can list all the headers (description lines) for the sequences using grep. Simply search for `>` and grep will list all the description lines.
```bash
grep ">" FILENAME
grep ">" AT_cDNA.fa
```
Alternatively, you can send it to a file if you want to use it later or you can just pipe it to less or more command to scroll through it line by line or page by page.
```bash
grep ">" FILENAME > HEADERFILE.txt
grep ">" FILENAME | less
grep ">" AT_cDNA.fa | less		
```
Use  &#8593; or &#8595; arrow keys to move up and down, press `q` to exit

</div>

{% include accordion title="Subtracting one list from another" controls="grep-3" %}
<div id="grep-3" class="accordion_content"   markdown='1' hidden>

If there is a small list of genes that you want to remove from a larger list, you can use the grep function with these options:
```bash
grep -Fvw -f sub_list.txt full_list.txt
```
here `-F` and `-w` will make sure that the full word is used as literal string, `-v` will NOT print the matching patterns and `-f filename.txt` is to say that the input patterns are in the file.

</div>

{% include accordion title="Count a word" controls="grep-4" %}
<div id="grep-4" class="accordion_content"   markdown='1' hidden>

Unlike previous example, if the word your are searching occurs more than once in a line, it will only be counted once. To avoid this, you need to use a special option
```bash
grep -o "PATTERN" FILENAME
```

Now, all sorts of useful information can be obtained by just printing the pattern, instead of entire line. For example, how many times do you see a word in every line:

```bash
grep -on "PATTERN" FILENAME | cut -f 1 -d ":" | sort | uniq -c
```
This will print line number followed by number of times you see the `PATTERN` in that line.

Now, let us have some fun with `grep`! See what kind of sequences are in `AT_cDNA.fa` file. Do they all seem to belong to same organism? Which organism?

Using `grep` you can also locate all the lines that contain a specific term you are looking for. This is very useful, especially to look for a specific gene among a large number of annotated sequences.
```bash
grep "word or phrase to search" FILENAME
```
***Task 2.4: Try searching for your favorite gene, to see if it is present in AT_cDNA.fa (this file contains all annotated sequences for Arabidopsis thaliana). Unlike Google or any search engines, only exact search terms will be identified, but you can ask grep to ignore cases while searching using -i option. Try these:***
```bash
grep -i "transcription factor" AT_cDNA.fa
grep -i "TFIIIA" AT_cDNA.fa
```
You can also use this feature to see if your sequence of interest has a specific feature (restriction site, motif etc.,) or not. This can be performed better using `--color` option of the `grep`.

</div>

{% include accordion title="Search a motif" controls="grep-5" %}
<div id="grep-5" class="accordion_content"   markdown='1' hidden>

Go to the sequences directory, search for `EcoR1` (`GAATTC`) site in the `NT21.fa` file, and use the color option. Also, try looking for a `C2H2` zinc finger motif in `RefSeq.faa` file (for simplicity let's assume zinc finger motif to be `CXXXCXXXXXXXXXXHXXXH`. Either you can use dots to represent any amino acids or use complex regular expressions to come up with a more representative pattern. Try these:

```bash
grep --color "GAATTC" ./Sequences/NT21.fa
grep --color "C..C............H...H" RefSeq.faa
```

</div>

{% include accordion title="Finding patterns that DO NOT match" controls="grep-6" %}
<div id="grep-6" class="accordion_content"   markdown='1' hidden>

You can also use `grep` command to exclude the results containing your search term. Say if you want to look at genes that are not located in chromosome 1, you can exclude it form your search by specifying `-v` option.

```bash
grep -i "transcription factor" AT_cDNA.fa| grep -v "chr1"
grep -i "transcription factor" AT_cDNA.fa| grep "chr1"
```

Notice the difference in output from the above two commands.

</div>

{% include accordion title="Searching for more than one pattern" controls="grep-7" %}
<div id="grep-7" class="accordion_content"   markdown='1' hidden>

You can also use `grep` to find as set of patterns in the same command. `grep` will print the line containing any one of those patterns you specify. For this, run it as follows:

Any one pattern of the three (`OR`)
```bash
grep 'pattern1|pattern2|pattern3' FILENAME
```

All three patterns (`AND`)
```bash
grep 'pattern1' FILENAME | grep 'pattern2' | grep 'pattern3'
```

Note that in the `OR` example, `|` stands for `or` while in the `AND` example it pipes the output from one command to another.

Try to understand the following command lines (and record your results, where applicable):

```bash
grep -c -w "ATP" RefSeq.faa
grep -c CGT[CA]GTG AT_cDNA.fa
grep -l "ATG" ./sequences/*.fa
```

You can also try some regular expressions related to nucleotide/protein sequences provided earlier to see how it works.

</div>

{% include accordion title="Finding blank lines" controls="grep-8" %}
<div id="grep-8" class="accordion_content"   markdown='1' hidden>

`grep` can also be used to find blank lines. From the `regex` above, you have seen that `^` marks the beginning of a line, while `$` marks the end. So, by searching for `^$` you are looking for lines that have no content (blank).

```bash
grep "^$" FILENAME
```

Similarly, if you want to remove blank lines, you can try:

```bash
grep -v "^$" FILENAME
```

</div>

{% include accordion title="Finding all the files that contain a term" controls="grep-9" %}
<div id="grep-9" class="accordion_content"   markdown='1' hidden>

When dealing with multiple files, you will end up in situations where you want to process subset of files that are of interest. To quickly find those file, knowing a unique term that occurs in them, you can use `grep`

```bash
grep -rl "PATTERN" .
```
here `-r` recursively searches all files in sub-folders and `-l`, rather than printing the matching line, prints the filename after the first occurrence. Note the `.` at the end, it tells `grep` to use all the files that are in the directory. The result is that you will have a subset of files that are of interest to you.

If you want files that do not you the term, you can replace `-l` with `-L` (like the option `-v` for negative match). This will list only files that **DO NOT** have any match.

```bash
grep -rL "PATTERN" .
```

</div>

{% include accordion title="Print lines before or after the matching term" controls="grep-10" %}
<div id="grep-10" class="accordion_content"   markdown='1' hidden>

With the regular `grep` search, you get the line containing the matching term. Sometimes, in order to know the context of this term, it is useful to print either lines before or after the term occurrence. With `-B` (for before) and `-A` (for after), you can specify the number of lines that you want to see.

```bash
grep -B 10 "PATTERN" FILENAME
```
This will print 10 lines (including the line that has the `PATTERN`) before the match

Similarly, to print lines after the match:

```bash
grep -A 10 "PATTERN" FILENAME
```

You can also combine to get both before and after lines

```bash
grep -B 10 -A 10 "PATTERN" FILENAME
```

</div>
</div>

## SED - replace pattern

The  streamline editor,  or `sed` command, is a stream editor that reads one or more text files, makes changes or edits according to editing script, and writes the results to standard output. First, we will discuss `sed` command with respect to search and replace function. Other uses for the `sed` can also be found in [this official sed guide](http://www.grymoire.com/Unix/Sed.html#uh-47).

{% include table content="| COMMAND SYNTAX | TASK | EXAMPLE |
| -------------- | ----------- | ------- |
| `sed 's/<PATTERN>/<REPLACEMENT>/g' FILE` | Replace all occurrences of a pattern in a file. | `sed 's/version/V/g' ` |
| `sed 's/<PATTERN>//g' FILE` | Delete all occurrences of a pattern in a file. | `sed 's/version//g'` |
| `sed 's/<PATTERN>/<REPLACEMENT>/N' FILE` | Replace the nth occurrence of a pattern in a line. | `sed 's/version/V/2'` |" %}


<div class="usa-accordion">

{% include accordion title="Find and replace" controls="sed-1" %}
<div id="sed-1" class="accordion_content"   markdown='1' hidden>

Most common use of `sed` is to substitute text, matching a pattern. The syntax for doing this in `sed` is as follows:

```bash
sed 'OPERATION/REGEXP/REPLACEMENT/FLAGS' FILENAME
```

  - Here, `/` is the delimiter (you can also use `_` (underscore), `|` (pipe) or `:` (colon) as delimiter as well)
  - `OPERATION` specifies the action to be performed (sometimes if a condition is satisfied). The most common and widely used operation is `s` which does the substitution operation (other useful operators include `y` for transformation, `i` for insertion, `d` for deletion etc.).
  - `REGEXP` and `REPLACEMENT` specify search term and the substitution term respectively for the operation that is being performed.
  - `FLAGS` are additional parameters that control the operation. Some common `FLAGS` include:
      * `g`	replace all the instances of `REGEXP` with `REPLACEMENT` (globally)
      * `N` where N is any number, to replace Nth instance of the `REGEXP` with `REPLACEMENT`
      * `p` if substitution was made, then prints the new pattern space
      * `i` ignores case for matching `REGEXP`
      * `w` file If substitution was made, write out the result to the given file
      * `d` when specified without `REPLACEMENT`, deletes the found `REGEXP`

Some search and replace examples:

find and replace all chr to chromosome in the file
```bash
sed 's/chr/chromosome/g' FILENAME > NEWFILE
```
find and replace, but only the one instance per line (first occurrence of chr will be changed to chromosome)
```bash
sed 's/chr/chromosome/1' FILENAME > NEWFILE
```
find and replace, but do it directly on the original file
```bash
sed -i 's/chr/chromosome/g' FILENAME
```
find and replace directly, but save a old version too
```bash
sed -i.old 's/chr/chromosome/g' FILENAME
```
find and replace, only if you also find MTF1 in the line
```bash
sed '/MTF1/s/chr/chromosome/g' FILENAME > NEWFILE
```

</div>

{% include accordion title="Print specific lines of the file" controls="sed-2" %}
<div id="sed-2" class="accordion_content"   markdown='1' hidden>


To print a specific line, you can use the address function, note that by deafault, `sed` will stream the entire file, so when you are interested in specific lines only, you will have to suppress this feature using the option `-n`.

print 10th line
```bash
sed -n '10p' FILENAME
```
You can provide any number of additional lines to print using `-e` option (you can add any number of lines like this)

print 10th and 15th line
```bash
sed -n -e '10p' -e '15p' FILENAME
```
It also accepts range, using `,`

print lines 10 to 50
```bash
sed -n '10,50p' FILENAME
```
or you can create specific pattern, like multiple of a number using `~`

Every tenth line starting from 10, 20, 30.. to end of the file
```bash
sed -n '10~10p' FILENAME
```
print odd-numbered lines
```bash
sed -n '1~2p' FILENAME
```

Most powerful feature is that you can combine these ranges or multiples in any fashion. Example: `fastq` files have header on first line and sequence in second, next two lines will have the quality and a blank extra line (four lines make one read). Sometimes you will only need the sequence and header

to print 1,2,5,6,9,10 so on you can use
```bash
sed -n '1~4p;2~4p' FASTQ_FILE
```
pipe this to make a fasta file
```bash
sed -n '1~4p;2~4p' FASTQ_FILE | sed 's/^@/>/g' > FASTA_FILE
```
More combinations:

print 1 to 10, and then multiples of 10
```bash
sed -n '1,10~10p'  FILENAME
```

</div>

{% include accordion title="Delete specific lines of the file" controls="sed-3" %}
<div id="sed-3" class="accordion_content"   markdown='1' hidden>


All the above address types (specific line, range, multiples), also works with other types of operation, such as deletion and insertion. For deletion, you need to swap `p` with `d`

delete first line
```bash
sed "1d" FILENAME
```
delete lines 1 thru 3
```bash
sed "1,3d" FILENAME
```
delete blank lines
```bash
sed 's/^$//g' FILENAME
```

</div>

{% include accordion title="Insert specific lines to a file" controls="sed-4" %}
<div id="sed-4" class="accordion_content"   markdown='1' hidden>

Here, you use `i` for inserting text anywhere in the file


put "line to insert" in the second line
```bash
sed '2 i line to insert' FILENAME
```
</div></div>

## AWK - manage order

{% include table content="| COMMAND SYNTAX | TASK | EXAMPLE |
| -------------- | ----------- | ------- |
| `awk '{print $1, $3}' <FILE>` | Print the first and third column of a file. | `awk '{print $1, $3}' file.txt' ` |
| `awk 'NF > 3' <FILE>` | Print only the lines with more than 3 fields (columns). | `awk 'NF > 3' file.txt` |
| `awk '{sum+=$2} END {print sum}' <FILE>` | Print the sum of all numbers in the second column. | `awk '{sum+=$2} END {print sum}' file.txt` |
| `awk '{printf \"%-10s %s\n\", $1, $2}' <FILE>` | Format the output. | `awk '{printf \"%-10s %s\n\", $1, $2}' file.txt` |" %}

{% include alert class="tip" content="See our other tutorials for more in-depth information about [AWK](./awk) and [BIOAWK](./bioawk)" %}

## CUT - cut characters



{% include table content="| COMMAND SYNTAX | TASK | EXAMPLE |
| -------------- | ----------- | ------- |
| `cut -f 1 <FILE>` | Cut out the first and 3rd to 5th columns from a file. | `cut -f 1,3-5 file.txt' ` |
| `cut -c 1-3 <FILE>` | Cut out the first three characters from each line. | `cut -c 1-3 file.txt` |" %}


## SORT - sort lines


{% include table content="| COMMAND SYNTAX | TASK | EXAMPLE |
| -------------- | ----------- | ------- |
| `sort <FILE>` | Sort the lines of a file. | `sort file.txt` |
| `sort -r <FILE>` | Sort the lines of a file in reverse order. | `sort -r file.txt` |
| `sort -k 2 <FILE>` | Sort the lines of a file based on the second field (column). | `sort -k 2 file.txt` |
| `sort -n <FILE>` | Sort the lines of a file numerically. | `sort -n file.txt` |" %}


## UNIQ - unique lines



{% include table content="| COMMAND SYNTAX | TASK | EXAMPLE |
| -------------- | ----------- | ------- |
| `uniq <FILE>` | Remove duplicated lines from a file. | `uniq file.txt` |
| `uniq -d <FILE>` | Show only the duplicates in a file. | `uniq -d file.txt`  |
| `uniq -u <FILE>` | Show only the unique lines in a file. | `uniq -u file.txt` |" %}


## TR - swap characters



{% include table content="| COMMAND SYNTAX | TASK | EXAMPLE |
| -------------- | ----------- | ------- |
| `tr '[:upper:]' '[:lower:]' < <FILE>` | Translate all uppercase letters to lowercase. | `tr '[:upper:]' '[:lower:]' < file.txt` |
| `tr ' ' '\t' < <FILE>` | Translate all spaces to tabs. | `tr ' ' '\t' < file.txt` |
| `tr -d '[AEIOUaeiou]' < <FILE>` | Delete all vowels from a file. | `tr -d '[AEIOUaeiou]' < file.txt` |" %}



## WC - count lines, words



{% include table content="| COMMAND SYNTAX | TASK | EXAMPLE |
| -------------- | ----------- | ------- |
| `wc <FILE>` | Count the number of lines, words, and characters in a file. | `wc file.txt` |
| `wc -l <FILE>` | Count the number of lines in a file. | `wc -l file.txt` |
| `wc -w <FILE>` | Count the number of words in a file. | `wc -w file.txt` |
| `wc -m <FILE>` | Count the number of characters in a file. | `wc -m file.txt` |" %}



## HEAD and TAIL



These tools are very useful for quickly inspecting the contents of a file and can be used to get an overview of the data before processing it with more complex text manipulation tools.

### HEAD

{% include table content="| COMMAND SYNTAX  | TASK | EXAMPLE |
| ------------------ | ----------------------------------- | ------------------- |
| `head <FILE>` | Print the first 10 lines of a file. | `head file.txt` |
| `head -n N <FILE>` | Print the first N lines of a file.  | head -n 5 file.txt  |
| `head -c N <FILE>` | Print the first N bytes of a file.  | head -c 10 file.txt |" %}



<base class="mt">

### TAIL

{% include table content="| COMMAND SYNTAX | TASK | EXAMPLE |
| ------------------ | --------------------------------------- | -------------------- |
| `tail <FILE>` | Print the last 10 lines of a file. | `tail file.txt` |
| `tail -n N <FILE>` | Print the last N lines of a file. | `tail -n 5 file.txt` |
| `tail -c N <FILE>` | Print the last N bytes of a file. | `tail -c N file.txt` |
| `tail -f <FILE>`   | Continuously monitor the end of a file. | `tail -f file.txt` |" %}

