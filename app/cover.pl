#!/usr/bin/perl

use strict;
print "------TESTING------\n\n";
my $tap_file = "test.tap";
open(FILE, $tap_file) or die "Could not open file\n";

my @output_array = ();
while (my $line = <FILE> ) {
	push (@output_array, $line);
}

#print "$a\n";
#my @output_array = split(/\n/, $cmd_output);
foreach my $line (@output_array) {
	if ($line =~ m/\S+\s+:\s+(\d+\.\d+)%/) {
		my $percentage = sprintf ("%.2f", $1);
		if ($percentage < 10.00) {
			#not_enough_statement_coverage();
			exit(1);
		} else {
			print "You pass! - ";
		}
		print "$percentage\n";
	} elsif ($line =~ m/\S+\s+:\s+(\d+)%/) {
		my $percentage = sprintf ("%.2f", $1);
		if ($percentage < 80.65) {
			print("You fail! - \n");
		} else {
			print "You pass! - ";
		}
		print "$percentage\n";
	}
}

close(FILE);
